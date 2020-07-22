import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CustomValidators } from 'ng2-validation';
import { ApiProvider } from '../../../service/api';
// import { ApiProvider } from '../../service/api';
@Component({
    selector: 'app-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.scss']
})
export class ManagerComponent {

    @ViewChild('addDlg',{static:false}) addDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
  
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
    searchOpt: any = {
        managername: '',
    };
    public managerList: Array<any> = [];
    public manager: any = {
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        Email: '',
        Type: 1,
        list: [],
    };
    public managerTypes = [
        "Manufacturer",
        "Gym Owner"
    ];
    managerFrom: FormGroup;
    phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    email: '';
    password: '';
    firstName: '';
    lastName: '';
    phone: '';
    managerData: any;
    userdata: any;
    role: any;
    constructor(
        public colors: ColorsService,
        public http: Http,
        private router: Router,
        private userInfo: UserService,
        private mdToast: ToasterService,
        fb: FormBuilder,
        public apiProvider: ApiProvider
    ) {
        this.getManager();
        this.managerFrom = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'firstName': [null, Validators.required],
            'lastName': [null, Validators.required],
            'password': [null, Validators.required],
            'phone': [null, Validators.required],
        });
        this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
        this.role = this.userdata['permissions']['role'];
    }
    getManager() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.apiProvider.getManager().subscribe(response => {
            if (response['status'] == '1') {
                this.managerData = response['users'];
                this.managerList = this.managerData;
            } 
        })
    }
    onCreateManager() {
        this.router.navigate(['/newuser']);
        // this.addDlg.open();
    }

    onChangeType(value) {
        this.manager.Type = value;
        this.manager.list = [];
    }

    public refreshList(value: any): void {
        this.manager.list = value;
    }

    onCancelManager() {
        this.managerFrom.reset();
        this.addDlg.close();
    }

    onConfirmManager() {
        //new api
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
        let params = {
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone
        }
        this.apiProvider.createManager(params).subscribe(response => {
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
                this.getManager();
            }else{
                this.toast(response['message'], "failed");
            }
        })
        this.addDlg.close();
    }

    validateEmail(email) {
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
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

    checkValidation() {
        for (let controller in this.managerFrom.controls) {
            this.managerFrom.get(controller).markAsTouched();
        }
        if (this.managerFrom.invalid) {
            return false;
        }
        else {
            //this.onSignUpNow();
            this.onConfirmManager();
        }
    }
    filterSearch() {
        let list = [];
        this.managerData.map(item => {
            if (this.searchOpt.managername.length > 0 && item.profile.displayName.toLowerCase().indexOf(this.searchOpt.managername.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });
        return list;
    }
    onChangeSearchValue(managername, value) {
        if (value) {
            this.searchOpt[managername] = value;
        }
        // Do Search function..
        this.managerList = this.filterSearch();
    }
    onDelete(item){
        console.log("item",item)
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
        let params = {
            employeeId :item._id
        }
        this.apiProvider.deleteEmployee(params).subscribe(response =>{
            console.log("delete",response)
            if(response['status'] == '1')
            {
                this.toast(response['message'], "success");
                this.getManager();
            }
        })
    }
}