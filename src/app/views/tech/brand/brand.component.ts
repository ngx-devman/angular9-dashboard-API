import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';


import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { EnvVariables } from '../../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { link } from 'fs';



@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss']
})
export class BrandComponent {

    @ViewChild('brandDlg',{static:false}) brandDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;

    actionType = 0;
    info: any = {};
    name: any = '';

    searchOpt: any = {
        brand: '',
    };

    public allBrandList: Array<any> = [];
    public brandList: Array<any> = [];
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });


    constructor(
        public colors: ColorsService,
        public http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private userInfo: UserService,
        private storage: StorageService,
        private mdToast: ToasterService
    ) {
        this.refreshBrand();
    }

    refreshBrand() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.BRAND_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((brand, idx) => {
                    brand['No'] = idx + 1;
                });
                this.allBrandList = list;
                this.brandList = this.filterSearch();
            } else {
                this.toast("Failed on loading brands!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    filterSearch() {
        let list = [];
        this.allBrandList.map(item => {

            if (this.searchOpt.brand.length > 0 && item.name.toLowerCase().indexOf(this.searchOpt.brand.toLowerCase()) == -1) {
                return;
            }

            list.push(item);
        });

        return list;
    }

    addBrandToServer() {

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Name: this.name,
        }
        let url;
        if (this.actionType == 0) {
            url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_BRAND;
        } else {
            url = EnvVariables.SERVER_ADDR + EnvVariables.UPDATE_BRAND;
            params['BrandId'] = this.info.id;
        }

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                if (this.actionType == 0) {
                    this.toast("Success on add brand!", "success");
                } else {
                    this.toast("Success on update brand!", "success");
                }
                this.refreshBrand();
            } else {
                if (this.actionType == 0) {
                    this.toast("Failed on add brand!", "danger");
                } else {
                    this.toast("Failed on update brand!", "danger");
                }
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onChangeValue(type, value) {
        if (value) {
            this.searchOpt[type] = value;
        }

        // Do Search function..
        this.brandList = this.filterSearch();
    }

    onCreateBrand() {
        this.actionType = 0;
        this.info = {
            name: '',
        };
        this.name = '';
        this.brandDlg.open();
    }

    onEditBrand(item) {
        this.actionType = 1;
        this.info = item;
        this.name = item.name;
        this.brandDlg.open();
    }

    onConfirmBrand() {
        this.addBrandToServer();
        this.brandDlg.close();
    }

    onCancelBrand() {
        this.brandDlg.close();
    }


    onDeleteBrand(item) {
        this.info = item;
        this.confirmDlg.open();
    }

    onConfirmDelete() {
        this.confirmDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            BrandId: this.info.id,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.DELETE_BRAND;

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on delete brand!", "success");
                this.refreshBrand();
            } else {
                this.toast("Failed on add delete brand!", "danger");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onCancelDelete() {
        this.confirmDlg.close();
    }

    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };

        this.mdToast.pop(toast);
    }
}
