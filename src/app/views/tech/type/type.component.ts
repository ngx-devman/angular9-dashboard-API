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
    selector: 'app-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss']
})
export class TypeComponent {

    @ViewChild('typeDlg',{static:false}) typeDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    isAdmin: any;
    actionType = 0;
    info: any = {};
    name: any = '';
    userType: any = '';
    searchOpt: any = {
        type: '',
    };

    public allTypeList: Array<any> = [];
    public typeList: Array<any> = [];
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

        this.userType = 'HVAC';

        this.refreshType();
    }

    refreshType() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            UserType: this.userInfo.getUserInfo('userType'),
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.TYPE_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((type, idx) => {
                    type['No'] = idx + 1;
                });
                this.allTypeList = list;
                this.typeList = this.filterSearch();
            } else {
                this.toast("Failed on loading types!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    filterSearch() {
        let list = [];
        this.allTypeList.map(item => {

            if (this.searchOpt.type.length > 0 && item.name.toLowerCase().indexOf(this.searchOpt.type.toLowerCase()) == -1) {
                return;
            }

            list.push(item);
        });

        return list;
    }

    addTypeToServer() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Name: this.name,
            UserType: this.userType,
        }


        let url;
        if (this.actionType == 0) {
            url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_TYPE;
        } else {
            url = EnvVariables.SERVER_ADDR + EnvVariables.UPDATE_TYPE;
            params['TypeId'] = this.info.id;
        }

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                if (this.actionType == 0) {
                    this.toast("Success on add type!", "success");
                } else {
                    this.toast("Success on update type!", "success");
                }
                this.refreshType();
            } else {
                if (this.actionType == 0) {
                    this.toast("Failed on add type!", "danger");
                } else {
                    this.toast("Failed on update type!", "danger");
                }
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onChangeSearchValue(type, value) {
        if (value) {
            this.searchOpt[type] = value;
        }
        // Do Search function..
        this.typeList = this.filterSearch();
    }

    onChangeValue(value) {
        this.userType = value;
    }

    onCreateType() {
        this.actionType = 0;
        this.info = {
            name: '',
        };
        this.name = '';
        this.userType = 'HVAC';
        this.typeDlg.open();
    }

    onEditType(item) {
        this.actionType = 1;
        this.info = item;
        this.name = item.name;
        this.userType = item.userType;
        this.typeDlg.open();
    }

    onConfirmType() {
        this.addTypeToServer();
        this.typeDlg.close();
    }

    onCancelType() {
        this.typeDlg.close();
    }


    onDeleteType(item) {
        this.info = item;
        this.confirmDlg.open();
    }

    onConfirmDelete() {
        this.confirmDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            TypeId: this.info.id,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.DELETE_TYPE;

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on delete brand!", "success");
                this.refreshType();
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
