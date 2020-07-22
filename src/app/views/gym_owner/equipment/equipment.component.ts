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
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent {

    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    @ViewChild('productImg',{static:false}) productImg: ElementRef;
    @ViewChild('productImg1',{static:false}) productImg1: ElementRef;

    actionType = 0;
    equipmentInfo: any = {
        type: 'Strength',
        serial: '',
    };

    title = "";

    isUploading = false;
    fileContainer: any = null;
    selName: any = '';

    fileContainer1: any = null;
    selName1: any = '';

    brandList: any = [];
    brandDict: any = {};
    selBrand: any = {};

    searchOpt: any = {
        type: 'All',
        brand: '',
        machineType: '',
    };

    public allEquipList: Array<any> = [];
    public equipList: Array<any> = [];
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
        this.refreshInfo();
    }

    refreshInfo() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            GymId: this.userInfo.getUserInfo('gym_id'),
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.GYM_OWNER_EQUIP_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.title = result.GymName;
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                });
                this.allEquipList = list;
                this.equipList = this.filterSearch();
            } else {
                this.toast("Failed on loading equipement!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onDetailEquipment(item) {
        this.storage.setValue('SEL_EQUIPMENT', item);
        this.router.navigate(['/gym/equipment_detail']);
    }

    onDetailImg(evt, url) {
        evt.stopPropagation();
        var image = new Image();
        image.src = url;
        var w = window.open("");
        w.document.write(image.outerHTML);
    }

    filterSearch() {
        let list = [];
        this.allEquipList.map(item => {
            if (this.searchOpt.type != 'All' && this.searchOpt.type != item.type) {
                return;
            }
            if (this.searchOpt.brand.length > 0 && item.brand.toLowerCase().indexOf(this.searchOpt.brand.toLowerCase()) == -1) {
                return;
            }
            if (this.searchOpt.machineType.length > 0 && item.machineType.toLowerCase().indexOf(this.searchOpt.machineType.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });
        return list;
    }

    chooseFile(container) {
        if (container.target.files.length == 0) {
            return;
        }
        this.fileContainer = container;
        this.selName = container.target.files[0].name;
        this.readImgContent();
    }

    chooseFile1(container) {
        if (container.target.files.length == 0) {
            return;
        }
        this.fileContainer1 = container;
        this.selName1 = container.target.files[0].name;
        this.readImgContent1();
    }

    readImgContent() {
        if (this.fileContainer.target.files && this.fileContainer.target.files[0]) {
            var reader = new FileReader();

            let self = this;
            reader.onload = function (e: any) {
                self.productImg.nativeElement.src = e.target.result;
            }

            reader.readAsDataURL(this.fileContainer.target.files[0]);
        }
    }

    readImgContent1() {
        if (this.fileContainer1.target.files && this.fileContainer1.target.files[0]) {
            var reader = new FileReader();
            let self = this;
            reader.onload = function (e: any) {
                self.productImg1.nativeElement.src = e.target.result;
            }
            reader.readAsDataURL(this.fileContainer1.target.files[0]);
        }
    }

    formatDate(date) {
        let time = new Date(date);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hr: any = time.getHours();
        let min: any = time.getMinutes();
        let pm = 'AM';
        if (hr > 11) {
            pm = 'PM';
            hr = hr == 12 ? hr : hr - 12;
        }

        hr = hr > 9 ? '' + hr : '0' + hr;
        min = min > 9 ? '' + min : '0' + min;
        let dateStr = month + "/" + day + "/" + year + " " + hr + ":" + min + " " + pm;
        return dateStr;
    }

    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };

        this.mdToast.pop(toast);
    }
    public onConfirmDelete() {

    }
    public onCancelDelete() {

    }
}
