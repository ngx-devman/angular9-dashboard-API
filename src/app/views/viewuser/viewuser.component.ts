import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { EnvVariables } from '../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { navItems, navTech, navItemsTechManager, navItemsGym, navItemsManufacture/*, navMainItems*/ } from '../../_nav';
import { Location } from '@angular/common';
@Component({
    selector: 'app-viewuser',
    templateUrl: './viewuser.component.html',
    styleUrls: ['./viewuser.component.scss']
})
export class ViewuserComponent {

    @ViewChild('addDlg',{static:false}) addDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;

    equipmentType: any = '';
    public techList: Array<any> = [];
    public name: any;
    public note: any;
    public navigate: any;
    public techManagerList: Array<any> = [];
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
    managerFrom: FormGroup;
    public items: any = [];
    public technicianname: any;
    public template: any;
    public manager: any = {
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        Type: 1,
        list: [],
    };
    public managerTypes = [
        "Manufacturer",
        "Gym Owner"
    ];
    techManagerDict: any = {};
    selTechManager: any = { "first_name": "" };
    public navItems: any;
    constructor(
        public colors: ColorsService,
        public http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private userInfo: UserService,
        private storage: StorageService,
        private mdToast: ToasterService,
        private location: Location,
        fb: FormBuilder,
    ) {
        this.equipmentType = 'HVAC';
        // this.refreshInfo();
        this.managerFrom = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'firstName': [null, Validators.required],
            'lastName': [null, Validators.required],
            'phoneNumber': [null],
        });
        // this.refreshTechManager();
        if (this.userInfo.getUserInfo('type') == 1) {
            this.navItems = navItemsTechManager;
        }
        else if (this.userInfo.getUserInfo('type') == 6) {
            this.navItems = navItemsManufacture;
        }
        else if (this.userInfo.getUserInfo('type') == 2 || this.userInfo.getUserInfo('type') == 5) {
            this.navItems = navItemsGym;
        }
        else if (this.userInfo.getUserInfo('type') == 0) {
            this.navItems = navTech;
        } else if (this.userInfo.getUserInfo('type') == -1) {
            this.navItems = navTech;//navMainItems;
        }
        else {
            this.navItems = navItems;
        }
        for (let i = 0; i < this.navItems.length; i++) {
            if (!this.navItems[i].title) {
                this.items.push(this.navItems[i]);
            }
        }
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
        url = EnvVariables.SERVER_ADDR + EnvVariables.TECH_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                    list[index]['name'] = item.firstName + ' ' + item.lastName;
                    list[index]['phonenumber'] = item.phoneNumber;
                });
                this.techList = list;
            } else {
                this.toast("Failed on loading techs!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    refreshTechManager() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.TECH_MANAGER_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                    list[index]['name'] = item.first_name + ' ' + item.last_name;
                    list[index]['phonenumber'] = item.phone_number;
                });
                this.techManagerList = list;
                this.techManagerList.map(type => {
                    this.techManagerDict[type.id] = type;
                });
                this.onChangeType(this.techManagerList[0].id);
            } else {
                this.toast("Failed on loading users!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }
    onChangeType(id) {
        this.selTechManager = this.techManagerDict[id];
    }
    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };
        this.mdToast.pop(toast);
    }
    SaveTemplate() {
        this.confirmDlg.open();
    }
    goBack() {
        this.location.back();
    }
}
