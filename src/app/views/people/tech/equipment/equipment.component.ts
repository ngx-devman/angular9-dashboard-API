import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';


import { ColorsService } from '../../../../shared/colors/colors.service';
import { UserService } from '../../../../shared/users/user.service';
import { EnvVariables } from '../../../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';



@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent {

    @ViewChild('equipmentDlg',{static:false}) equipmentDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    @ViewChild('fileInput',{static:false}) fileInput: ElementRef;
    @ViewChild('productImg',{static:false}) productImg: ElementRef;

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
        this.refreshBrand();
        this.refreshType();
    }

    refreshInfo() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.EQUIP_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
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

    refreshBrand() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            LastId: 0,
            Count: -1,
        };

        let url = EnvVariables.SERVER_ADDR + EnvVariables.BRAND_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.brandList = result.Data;
                this.brandList.map(brand => {
                    this.brandDict[brand.id] = brand;
                });
                this.onChangeBrand(this.brandList[0].id);
            } else {
                this.toast("Failed on loading jobs!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    refreshType() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            UserType: this.userInfo.getUserInfo('userType'),
            LastId: 0,
            Count: -1,
        };
        let url = EnvVariables.SERVER_ADDR + EnvVariables.TYPE_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.typeList = result.Data;
                this.typeList.map(type => {
                    this.typeDict[type.id] = type;
                });
                this.onChangeType(this.typeList[0].id);
            } else {
                this.toast("Failed on loading jobs!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onDetailImg(url) {
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

            if (this.searchOpt.brand.length > 0 && item.brandName.toLowerCase().indexOf(this.searchOpt.brand.toLowerCase()) == -1) {
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

    uploadFile(container) {
        const bucket = new S3({
            accessKeyId: 'AKIAJVPWQELHLN6GO5RA',
            secretAccessKey: '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',
            region: 'us-east-2'
        });
        const file = container.target.files[0];
        const len = file.name.length;
        const fileName = this.equipmentInfo.id + "_" + Date.now() + file.name.substring(len - 4);
        const params = {
            Bucket: 'nortonfitness',
            Key: 'equipment/' + fileName,
            Body: file,
        };

        this.isUploading = true;
        bucket.upload(params, (err, data) => {
            if (err) {
                this.toast("Failed on add new equipment!", "failed");
                this.isUploading = false;
            } else {
                this.deleteFile(this.equipmentInfo.imgUrl);
                this.addEquipmentToServer(data.Location);
            }
        });
    }

    deleteFile(filePath) {
        if (filePath == undefined) {
            return;
        }

        if (filePath.length < 45) {
            return;
        }

        const bucket = new S3({
            accessKeyId: 'AKIAJVPWQELHLN6GO5RA',
            secretAccessKey: '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',
            region: 'us-east-2'
        });

        const bucketFilePath = filePath.substr(49);
        const params = {
            Bucket: 'nortonfitness',
            Key: bucketFilePath
        };

        bucket.deleteObject(params, (err, data) => {
            if (err) {
                this.isUploading = false;
            } else {
            }
        });
    }

    addEquipmentToServer(fileUrl) {
        this.fileInput.nativeElement.value = '';

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            EquipmentName: this.equipmentInfo.name,
            Brand: this.selBrand.id,
            Type: this.selType.id,
            MachineType: this.equipmentInfo.machineType,
            Model: this.equipmentInfo.model,
            Serial: this.equipmentInfo.serial,
            Note: this.equipmentInfo.note,
            HowToUse: this.equipmentInfo.howToUse,
            ImgUrl: fileUrl,
            ImgUrl1: "",
            Exercise: this.exercises,
            ManualLink: "",
            VideoLink1: this.equipmentInfo.videoLink1,
            VideoLink2: this.equipmentInfo.videoLink2,
            VideoLink3: this.equipmentInfo.videoLink3,
        }
        let url;
        if (this.actionType == 0) {
            url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_EQUIP;
        } else {
            url = EnvVariables.SERVER_ADDR + EnvVariables.UPDATE_EQUIP;
            params['EquipmentId'] = this.equipmentInfo.id;
        }

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                if (this.actionType == 0) {
                    this.toast("Success on add equipment!", "success");
                } else {
                    this.toast("Success on update equipment!", "success");
                }
                this.refreshInfo();
            } else {
                if (this.actionType == 0) {
                    this.toast("Failed on add equipment!", "danger");
                } else {
                    this.toast("Failed on update equipment!", "danger");
                }
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onChangeValue1(value) {
        this.equipmentInfo['type'] = value;
    }

    public refreshList(value: any): void {
        this.exercises = '';
        for (var i = 0; i < value.length; i++) {
            let exercise = value[i].text;
            if (i != value.length - 1) {
                this.exercises += exercise + ', ';
            }
            else {
                this.exercises += exercise;
            }
        }
    }

    onChangeEquipmentName(value) {
        this.equipmentInfo.name = value;
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
        if (value) {
            this.searchOpt[type] = value;
        }

        // Do Search function..
        this.equipList = this.filterSearch();
    }

    onCreateEquipment() {
        this.actionType = 0;
        this.equipmentInfo = {
            type: '',
            name: '',
            manualLink: '',
        };
        this.productImg.nativeElement.src = '';
        this.selName = null;
        this.equipmentDlg.open();
    }

    onEditEquipment(item) {
        this.actionType = 1;
        this.selName = null;
        let equip = item;
        let ary = [];
        if (equip.exercise && equip.exercise.length > 0) {
            ary = equip.exercise.split(", ");
        }
        this.equipmentInfo = {
            id: equip.id,
            imgUrl: equip.imgUrl,
            imgUrl1: equip.imgUrl1,
            type: equip.type,
            name: equip.name,
            brand: equip.brand,
            brandName: equip.brandName,
            machineType: equip.machineType,
            model: equip.model,
            note: equip.note,
            howToUse: equip.howToUse,
            exercises: ary,
            manualLink: equip.manualLink,
            videoLink1: equip.videoLink1,
            videoLink2: equip.videoLink2,
            videoLink3: equip.videoLink3,
        };
        this.selBrand = this.brandDict[equip.brand] ? this.brandDict[equip.brand] : {};
        this.selType = this.typeDict[equip.type] ? this.typeDict[equip.type] : {};
        this.equipmentDlg.open();
    }

    onManualClick() {
        window.open(this.equipmentInfo.manualLink);
    }

    onConfirmEquipment() {
        this.isUploading = true;

        if (this.selName) {
            this.uploadFile(this.fileContainer);
        } else {
            this.addEquipmentToServer(this.equipmentInfo.imgUrl);
        }

        this.equipmentDlg.close();
    }

    onCancelEquipment() {
        this.equipmentDlg.close();
    }

    onDeleteEquipment(item) {
        let equip = item;
        this.equipmentInfo = equip;
        this.confirmDlg.open();
    }

    onConfirmDelete() {
        this.confirmDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            EquipmentId: this.equipmentInfo.id,
        };
        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.DELETE_EQUIP;

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on delete equipment!", "success");
                this.refreshInfo();
            } else {
                this.toast("Failed on add delete equipment!", "danger");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });

        this.deleteFile(this.equipmentInfo.imgUrl);
        this.deleteFile(this.equipmentInfo.imgUrl1);
        this.deleteFile(this.equipmentInfo.manualLink);
    }

    onCancelDelete() {
        this.confirmDlg.close();
    }


    onReportEquipment(idx) {
        this.equipmentDlg.open();
    }

    public myListFormatter(data: any): string {
        return data['name'];
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
}
