import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';

import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { EnvVariables } from '../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'app-group-equipment',
    templateUrl: './group-equipment.component.html',
    styleUrls: ['./group-equipment.component.scss']
})
export class GroupEquipmentComponent {

    @ViewChild('equipmentDlg',{static:false}) equipmentDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;

    actionType = 0;
    equipmentId: any = '';
    templateId: any = '';
    tagId: any = '';
    serial: any = '';

    group: any;
    searchOpt: any = {
        type: 'All',
        brand: '',
        model: '',
    };
    selEquipment: any = '';

    public equipList: Array<any> = [];
    public allEquipList: Array<any> = [];
    public groupEquipList: Array<any> = [];

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
        this.group = this.storage.getValue('SEL_GROUP');
        if (this.group) {
            this.refreshInfo();
            this.getGroupEquipList();
        } else {
            this.router.navigate(['/main/group']);
        }
    }

    refreshInfo() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            GroupId: this.group.id,
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.GROUP_EQUIP_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                });
                this.equipList = list;
            } else {
                this.toast("Failed on loading jobs!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    getGroupEquipList() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.NONE_EQUIP_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                });
                this.allEquipList = list;
                this.groupEquipList = this.filterSearch();
            } else {
                this.toast("Failed on loading equipments!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
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
            if (this.searchOpt.model.length > 0 && item.model.toLowerCase().indexOf(this.searchOpt.model.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });
        return list;
    }

    onDetailImg(url, evt) {
        evt.stopPropagation();
        var image = new Image();
        image.src = url;
        var w = window.open("");
        w.document.write(image.outerHTML);
    }

    onSelectEquipment(item) {
        this.selEquipment = item;
        this.templateId = item.id;
    }

    addNFCTag() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            GroupId: this.group.id,
            TemplateId: this.templateId,
            EquipmentId: this.equipmentId,
            TagId: this.tagId,
            Serial: this.serial,
        }
        let url;
        if (this.actionType == 0) {
            url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_GROUP_EQUIPMENT;
        } else {
            url = EnvVariables.SERVER_ADDR + EnvVariables.UPDATE_GROUP_EQUIPMENT;
        }

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                if (this.actionType == 0) {
                    this.toast("Success on add blue tag!", "success");
                } else {
                    this.toast("Success on update blue tag!", "success");
                }
                this.refreshInfo();
                this.getGroupEquipList();
            } else {
                if (this.actionType == 0) {
                    this.toast("Failed on add blue tag!", "danger");
                } else {
                    this.toast("Failed on update blue tag!", "danger");
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
        this.groupEquipList = this.filterSearch();
    }

    onCreateEquipment() {
        this.actionType = 0;
        this.selEquipment = {};
        this.equipmentId = '';
        this.templateId = '';
        this.tagId = '';
        this.serial = '';
        this.equipmentDlg.open();
    }

    onEditEquipment(item) {
        this.actionType = 1;
        this.selEquipment = item;
        this.equipmentId = item.id;
        this.templateId = item.template_id;
        this.serial = item.serial;
        this.tagId = item.tag_id;
        this.equipmentDlg.open();
    }

    onConfirmEquipment() {
        if (!this.selEquipment.id) {
            this.toast("You need to select equipment!", "warning");
            return;
        }

        this.addNFCTag();
        this.equipmentDlg.close();
    }
    onCancelEquipment() {
        this.equipmentDlg.close();
    }
    onDeleteEquipment(item) {
        let equip = item;
        this.selEquipment = equip;
        this.confirmDlg.open();
    }

    onConfirmDelete() {
        this.confirmDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            GroupId: this.group.id,
            EquipmentId: this.selEquipment.id,
        };
        let url = EnvVariables.SERVER_ADDR + EnvVariables.DELETE_GROUP_EQUIPMENT;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on delete equipment!", "success");
                this.refreshInfo();
                this.getGroupEquipList();
            } else {
                this.toast("Failed on add delete equipment!", "danger");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onCancelDelete() {
        this.confirmDlg.close();
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
