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
import { Location } from '@angular/common';


@Component({
    selector: 'app-group-technician-list',
    templateUrl: './group-technician-list.component.html',
    styleUrls: ['./group-technician-list.component.scss']
})
export class GroupTechnicianListComponent {

    @ViewChild('addDlg',{static:false}) addDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    GroupId: '';
    GroupName: '';
    equipmentType: any = '';
    public techList: Array<any> = [];
    public techManagerList: Array<any> = [];
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
    managerFrom: FormGroup;
    techname: any;
    public items: any = [];
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
    status = 1;
    isAdmin = 0;
    techManagerDict: any = {};
    selTechManager: any = { "first_name": "" };

    searchOpt: any = {
        techname: '',
    };
    public technicianList: Array<any> = [];

    constructor(
        public colors: ColorsService,
        public http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private userInfo: UserService,
        private storage: StorageService,
        private mdToast: ToasterService,
        fb: FormBuilder, private location: Location,

    ) {
        this.GroupId = this.route.snapshot.params.id;
        this.GroupName = this.route.snapshot.params.groupName;
        this.equipmentType = 'HVAC';
        this.refreshInfo();
        this.managerFrom = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'firstName': [null, Validators.required],
            'lastName': [null, Validators.required],
            'phoneNumber': [null],
        });
        this.isAdmin = this.userInfo.getUserInfo('type');
        this.refreshTechManager();
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
                this.technicianList = list;
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
    onCreateTechnician() {
        this.equipmentType = "HVAC";
        this.addDlg.open();
    }
    onChangeType(id) {
        this.selTechManager = this.techManagerDict[id];
    }
    onChangeValue(value) {
        this.equipmentType = value;
    }
    public refreshList(value: any): void {
        this.manager.list = value;
    }
    onCancelTechnician() {
        this.addDlg.close();
    }
    checkValidation() {
        // for (let controller in this.managerFrom.controls) {
        //     this.managerFrom.get(controller).markAsTouched();
        //   }
        //   if(this.managerFrom.invalid) {
        //       return false;
        //   }
        //  else
        // {
        //this.onSignUpNow();
        this.onConfirmManager();
        // }
    }
    onConfirmManager() {
        if (this.manager.FirstName == '') {
            this.toast("Input valid first name!", "danger");
            return;
        }

        if (this.manager.LastName == '') {
            this.toast("Input valid last name!", "danger");
            return;
        }

        if (!this.validateEmail(this.manager.Email)) {
            this.toast("Input valid email!", "danger");
            return;
        }

        let data = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Email: this.manager.Email,
            FirstName: this.manager.FirstName,
            LastName: this.manager.LastName,
            PhoneNumber: this.manager.PhoneNumber,
            EquipmentType: this.equipmentType,
            TechManagerId: this.selTechManager.id,
            UserType: this.selTechManager.userType,
            Status: 1

        };

        let url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_TECH;
        this.http.post(url, data).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on creating technician!", "success");
                this.refreshInfo();
            } else {
                this.toast("Failed on creating technician!", "danger");
            }
        }, error => {
            this.toast("Error on http request!", "danger");
        });
        this.addDlg.close();
    }

    validateEmail(email) {
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
    }
    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };
        this.mdToast.pop(toast);
    }
    filterSearch() {
        let list = [];
        this.techList.map(item => {
            if (this.searchOpt.techname.length > 0 && item.name.toLowerCase().indexOf(this.searchOpt.techname.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });
        return list;
    }
    onChangeSearchValue(techname, value) {
        if (value) {
            this.searchOpt[techname] = value;
        }
        // Do Search function..
        this.technicianList = this.filterSearch();
    }
    onInfo(item) {
        this.router.navigate(['/main/viewgrouptechnician'])
    }
}