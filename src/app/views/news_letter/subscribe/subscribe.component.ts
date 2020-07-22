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



@Component({
    selector: 'app-subscribe',
    templateUrl: './subscribe.component.html',
    styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {

   

    actionType = 0;
    equipmentInfo: any = {
        type: 'Strength',
        name: '',
        serial: '',
        exercises: [],
    };

    searchOpt: any = {
        type: 'All',
        brand: '',
        machineType: '',
    };

    isUploading = false;
    fileContainer: any = null;
    selName: any = '';

    exercises: any = '';

    brandList: any = [];
    typeDict: any = {};
    brandDict: any = {};
    selType: any = {};
    selBrand: any = {};

    typeList: any = [];

    public allEquipList: Array<any> = [];
    public equipList: Array<any> = [];
    public config : ToasterConfig = new ToasterConfig({
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
        this.refreshInfo();
        
    }

    refreshInfo() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.SUBSCRIBE_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if(result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                });
                this.allEquipList = list;
                this.equipList = this.filterSearch();
            } else {
                this.toast("Failed on loading jobs!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }


    filterSearch() {
        let list = [];
        this.allEquipList.map(item => {
            if(this.searchOpt.type != 'All' && this.searchOpt.type != item.type) {
                return;
            }

            if(this.searchOpt.brand.length > 0 && item.brandName.toLowerCase().indexOf(this.searchOpt.brand.toLowerCase()) == -1) {
                return;
            }

            if(this.searchOpt.machineType.length > 0 && item.machineType.toLowerCase().indexOf(this.searchOpt.machineType.toLowerCase()) == -1) {
                return;
            }

            list.push(item);
        });

        return list;
    }

    onChangeValue1(value) {
        this.equipmentInfo['type'] = value;
    }

    public refreshList(value: any): void {
        this.exercises = '';
        for(var i = 0; i < value.length; i++) {
            let exercise = value[i].text;
            if(i != value.length - 1) {
                this.exercises += exercise + ', ';
            }
            else {
                this.exercises += exercise;
            }
        }
    }

   

    onChangeType(id) {
        this.selType = this.typeDict[id];
        // this.equipmentInfo['brand'] = this.selBrand.id;
    }

    onChangeBrand(id) {
        this.selBrand = this.brandDict[id];
        // this.equipmentInfo['brand'] = this.selBrand.id;
    }

    onChangeValue(type, value) {
        if(value) {
            this.searchOpt[type] = value;
        }
        this.equipList = this.filterSearch();
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
