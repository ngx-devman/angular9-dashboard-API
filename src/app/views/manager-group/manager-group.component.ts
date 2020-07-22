import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';

import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { EnvVariables } from '../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
@Component({
    selector: 'app-manager-group',
    templateUrl: './manager-group.component.html',
    styleUrls: ['./manager-group.component.scss']
})
export class ManagerGroupComponent {

    //   @ViewChild('addDlg',{static:false}) addDlg: ModalComponent;
    //     @ViewChild('addTechDlg',{static:false}) addTechDlg: ModalComponent;
    //     @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;

    //     public userList: Array<any> = [];
    //     public config : ToasterConfig = new ToasterConfig({
    //         positionClass: 'toast-bottom-right'
    //     });

    //     group: any;
    //     searchOpt: any = {
    //         name: '',
    //         email: '',
    //     };
    //     searchOptTech: any = {
    //         name: '',
    //         email: '',
    //     };
    //     public allManagerList: Array<any> = [];
    //     public managerList: Array<any> = [];
    //     public allTechList: Array<any> = [];
    //     public techList: Array<any> = [];
    //     selManager: any = '';
    //     seltech: any = '';
    //     selGroupMember: any = '';

    //     constructor(
    //         public colors: ColorsService,
    //         public http: Http,
    //         private route: ActivatedRoute,
    //         private router: Router,
    //         private userInfo: UserService,
    //         private storage: StorageService,
    //         private mdToast: ToasterService
    //     ) {
    //         this.group = this.storage.getValue('SEL_GROUP');
    //         if(this.group) {
    //             this.refreshInfo();
    //             this.getTechManagerList();
    //             this.getTechList();
    //         } else {
    //             // this.router.navigate(['/main/group']);
    //             this.router.navigate(['/main/group-manager']);
    //         }
    //     }

    //     refreshInfo() {
    //         let params = {
    //             UserId: this.userInfo.getUserInfo('id'),
    //             Token: this.userInfo.getUserInfo('token'),
    //             GroupId: this.group.id
    //         };

    //         let url;
    //         url = EnvVariables.SERVER_ADDR + EnvVariables.GROUP_MANAGER_LIST;
    //         this.http.post(url, params).subscribe(response => {
    //             let result = response.json();
    //             if(result.Success == true) {
    //                 let list = result.Data;
    //                 list.map((item, index) => {
    //                     list[index]['No'] = index + 1;
    //                 });
    //                 this.userList = list;
    //             } else {
    //                 this.toast("Failed on loading users!", "failed");
    //             }
    //         }, error => {
    //             this.toast("Error on http request!", "failed");
    //         });
    //     }

    //     getTechManagerList() {
    //         let params = {
    //             UserId: this.userInfo.getUserInfo('id'),
    //             Token: this.userInfo.getUserInfo('token'),
    //             AdminId: this.userInfo.getUserInfo('id'),
    //             GroupId: this.group.id,
    //         };

    //         let url = EnvVariables.SERVER_ADDR + EnvVariables.COMPANY_MANAGER_LIST;
    //         this.http.post(url, params).subscribe(response => {
    //             let result = response.json();
    //             if(result.Success == true) {
    //                 let list = result.Data;
    //                 list.map((item, index) => {
    //                     list[index]['No'] = index + 1;
    //                     list[index]['name'] = item.first_name + ' ' + item.last_name;
    //                 });
    //                 this.allManagerList = list;
    //                 this.managerList = this.filterSearch();
    //             } else {
    //                 this.toast("Failed on loading users!", "failed");
    //             }
    //         }, error => {
    //             this.toast("Error on http request!", "failed");
    //         });
    //     }

    //     getTechList() {

    //         let params = {
    //             UserId: this.userInfo.getUserInfo('id'),
    //             Token: this.userInfo.getUserInfo('token'),
    //             AdminId: this.userInfo.getUserInfo('id'),
    //             GroupId: this.group.id,
    //         };

    //         let url = EnvVariables.SERVER_ADDR + EnvVariables.COMPANY_TECH_LIST;
    //         this.http.post(url, params).subscribe(response => {
    //             let result = response.json();
    //             if(result.Success == true) {
    //                 let list = result.Data;
    //                 list.map((item, index) => {
    //                     list[index]['No'] = index + 1;
    //                     list[index]['name'] = item.firstName + ' ' + item.lastName;
    //                 });
    //                 this.allTechList = list;
    //                 this.techList = this.filterSearchTech();
    //             } else {
    //                 this.toast("Failed on loading users!", "failed");
    //             }
    //         }, error => {
    //             this.toast("Error on http request!", "failed");
    //         });
    //     }

    //     filterSearch() {
    //         let list = [];
    //         this.allManagerList.map(item => {
    //             if(this.searchOpt.name.length > 0 && item.name.toLowerCase().indexOf(this.searchOpt.name.toLowerCase()) == -1) {
    //                 return;
    //             }

    //             if(this.searchOpt.email.length > 0 && item.email.toLowerCase().indexOf(this.searchOpt.email.toLowerCase()) == -1) {
    //                 return;
    //             }

    //             list.push(item);
    //         });

    //         return list;
    //     }

    //     filterSearchTech() {
    //         let list = [];
    //         this.allTechList.map(item => {
    //             if(this.searchOptTech.name.length > 0 && item.name.toLowerCase().indexOf(this.searchOptTech.name.toLowerCase()) == -1) {
    //                 return;
    //             }

    //             if(this.searchOptTech.email.length > 0 && item.email.toLowerCase().indexOf(this.searchOptTech.email.toLowerCase()) == -1) {
    //                 return;
    //             }
    //             list.push(item);
    //         });

    //         return list;
    //     }


    //     onChangeValue(type, value) {
    //         if(value) {
    //             this.searchOpt[type] = value;
    //         }
    //         this.managerList = this.filterSearch();
    //     }

    //     onChangeValueTech(type, value) {
    //         if(value) {
    //             this.searchOptTech[type] = value;
    //         }
    //         this.allTechList = this.filterSearchTech();
    //     }

    //     onSelectManager(item) {
    //         this.selManager = item;
    //     }

    //     onSelectTech(item) {
    //         this.seltech = item;
    //     }

    //     onCreateManager() {
    //         this.addDlg.open();
    //     }

    //     onCreateTech() {
    //         this.addTechDlg.open();
    //     }

    //     onCancelManager() {
    //         this.addDlg.close();
    //     }

    //     onCancelTech() {
    //         this.addTechDlg.close();
    //     }

    //     onConfirmManager() {
    //         if(this.selManager == '') {
    //             this.toast("Input select manager!", "danger");
    //             return;
    //         }

    //         let data = {
    //             UserId: this.userInfo.getUserInfo('id'),
    //             Token: this.userInfo.getUserInfo('token'),
    //             GroupId: this.group.id,
    //             ManagerId: this.selManager.id,
    //         };

    //         let url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_GROUP_MANAGER;
    //         this.http.post(url, data).subscribe(response => {
    //             let t= response.text();
    //             // let result = response.json();
    //             if(response.statusText== "OK") {
    //                 this.toast("Success on creating manager!", "success");
    //                 this.refreshInfo();
    //                 this.getTechManagerList();
    //                 this.getTechList();
    //             } else {
    //                 this.toast("Failed on creating manager!", "danger");
    //             }
    //         }, error => {
    //             this.toast("Error on http request!", "danger");
    //         });
    //         this.addDlg.close();
    //     }

    //     onConfirmTech() {
    //         if(this.seltech == '') {
    //             this.toast("Input select technicion!", "danger");
    //             return;
    //         }

    //         let data = {
    //             UserId: this.userInfo.getUserInfo('id'),
    //             Token: this.userInfo.getUserInfo('token'),
    //             GroupId: this.group.id,
    //             ManagerId: this.seltech.id,
    //         };  

    //         let url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_GROUP_MANAGER;
    //         this.http.post(url, data).subscribe(response => {
    //             // let result = response.json();
    //             // if(result.Success == true) {
    //             if(response.statusText== "OK") {
    //                 this.toast("Success on creating manager!", "success");
    //                 this.refreshInfo();
    //                 this.getTechManagerList();
    //                 this.getTechList();
    //             } else {
    //                 this.toast("Failed on creating manager!", "danger");
    //             }
    //         }, error => {
    //             this.toast("Error on http request!", "danger");
    //         });
    //         this.addTechDlg.close();
    //     }

    //     onDelete(item) {
    //         this.selGroupMember = item;
    //         this.confirmDlg.open();
    //     }

    //     onConfirmDelete() {
    //         this.confirmDlg.close();

    //         let params = {
    //             UserId: this.userInfo.getUserInfo('id'),
    //             Token: this.userInfo.getUserInfo('token'),
    //             GroupMemberId: this.selGroupMember.id,
    //         };
    //         let url = EnvVariables.SERVER_ADDR + EnvVariables.DELETE_GROUP_MANAGER;

    //         this.http.post(url, params).subscribe(response => {
    //             let result = response.json();
    //             if(result.Success == true) {
    //                 this.toast("Success on delete manager!", "success");
    //                 this.refreshInfo();
    //             } else {
    //                 this.toast("Failed on add delete manager!", "danger");
    //             }
    //         }, error => {
    //             this.toast("Error on http request!", "failed");
    //         });
    //     }

    //     onCancelDelete() {
    //         this.confirmDlg.close();        
    //     }

    //     formatDate(date) {
    //         let time = new Date(date);
    //         let year = time.getFullYear();
    //         let month = time.getMonth() + 1;
    //         let day = time.getDate();
    //         let hr: any = time.getHours();
    //         let min: any = time.getMinutes();
    //         let pm = 'AM';
    //         if(hr > 11) {
    //             pm = 'PM';
    //             hr = hr == 12 ? hr : hr - 12;
    //         }

    //         hr = hr > 9 ? '' + hr : '0' + hr;
    //         min = min > 9 ? '' + min : '0' + min;
    //         let dateStr = month + "/" + day + "/" + year + " " + hr + ":" + min + " " + pm;
    //         return dateStr;
    //     }

    //     public toast(text, type) {
    //         var toast: Toast = {
    //             type: type,
    //             title: text,
    //             showCloseButton: true
    //         };

    //         this.mdToast.pop(toast);
    //     }
    // }
    @ViewChild('groupDlg',{static:false}) groupDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;

    actionType = 0;
    groupInfo: any = {};

    public groupList: Array<any> = [];
    public selGroupIdx: any = null;

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
        };
        let url = EnvVariables.SERVER_ADDR + EnvVariables.GROUP_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                });
                this.groupList = list;
            } else {
                this.toast("Failed on loading groups!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onDetailGroup(item) {
        this.storage.setValue('SEL_GROUP', item);
        this.router.navigate(['/main/group-manager']);
    }

    onDeleteGroup(evt, item) {
        evt.stopPropagation();
        this.groupInfo.Id = item.id;
        this.confirmDlg.open();
    }

    onMembers(evt, item) {
        evt.stopPropagation();
        this.storage.setValue('SEL_GROUP', item);
        this.router.navigate(['/main/group-manager']);
    }

    onCreateGroup() {
        this.actionType = 0;
        this.groupInfo.Name = "";

        this.groupDlg.open();
    }

    onEditGroup(evt, item) {
        evt.stopPropagation();
        this.actionType = 1;
        this.groupInfo.Id = item.id;
        this.groupInfo.Name = item.group_name;
        this.groupDlg.open();
    }

    onConfirmAdd() {
        this.groupDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Name: this.groupInfo.Name
        };

        let url;
        if (this.actionType == 0) {
            url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_GROUP;
        } else {
            url = EnvVariables.SERVER_ADDR + EnvVariables.UPDATE_GROUP;
            params['GroupId'] = this.groupInfo.Id;
        }
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                if (this.actionType == 0) {
                    this.toast("Success on add group!", "success");
                } else {
                    this.toast("Success on update group!", "success");
                }
                this.refreshInfo();
            } else {
                if (this.actionType == 0) {
                    this.toast("Failed on add group!", "danger");
                } else {
                    this.toast("Failed on update group!", "danger");
                }
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onCancelAdd() {
        this.groupDlg.close();
    }

    onConfirmDelete() {
        this.confirmDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            GroupId: this.groupInfo.Id,
        };
        let url = EnvVariables.SERVER_ADDR + EnvVariables.DELETE_GROUP;

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on delete group!", "success");
                this.refreshInfo();
            } else {
                this.toast("Failed on add delete!", "danger");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onCancelDelete() {
        this.confirmDlg.close();
    }

    onReportGroup(item) {
        let group = item;
        this.storage.setValue('REPORT_ID', group.id);
        this.storage.setValue('REPORT_FLAG', 'GROUP');
        this.storage.setValue('REPORT_NAME', group.name);
        this.router.navigate(['/main/report']);
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
