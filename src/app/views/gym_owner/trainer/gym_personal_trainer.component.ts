import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';

import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { EnvVariables } from '../../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'app-trainer',
    templateUrl: './gym_personal_trainer.component.html',
    styleUrls: ['./gym_personal_trainer.component.scss']
})
export class GymPersonalTrainerComponent {

    @ViewChild('addDlg',{static:false}) addDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;


    public userList: Array<any> = [];
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });

    public items: any = [];
    public manager: any = {
        FirstName: '',
        LastName: '',
        Email: '',
        Type: 1,
        list: [],
    };
    public managerTypes = [
        "Manufacturer",
        "Gym Owner"
    ];

    public gymList = [];
    public brandList = [];


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
            GymId: this.userInfo.getUserInfo('gym_id')
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.GYM_TRAINER;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                    list[index]['name'] = item.firstName + ' ' + item.lastName;
                });
                this.userList = list;
            } else {
                this.toast("Failed on loading users!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    showClientList(item) {
        this.storage.setValue('gym_trainer_id', item.id);
        this.storage.setValue('trainer_name', item.name);
        this.router.navigate(['/gym/gym_trainer_client']);
    }

    onCreateManager() {
        this.addDlg.open();
    }

    onChangeType(value) {
        this.manager.Type = value;
        this.manager.list = [];
    }

    public refreshList(value: any): void {
        this.manager.list = value;
    }

    onCancelManager() {
        this.addDlg.close();
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
            GymId: this.userInfo.getUserInfo('gym_id')
        };

        let url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_MANAGER_TRAINER;
        this.http.post(url, data).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on creating trainer!", "success");
                this.refreshInfo();
            } else {
                this.toast("Failed on creating trainer!", "danger");
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

    onDelete(item) {
        this.manager = item;
        this.confirmDlg.open();
    }

    onConfirmDelete() {
        this.confirmDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            TrainerId: this.manager.id,
        };
        let url = EnvVariables.SERVER_ADDR + EnvVariables.DELETE_MANAGER_TRAINER;

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on delete trainer!", "success");
                this.refreshInfo();
            } else {
                this.toast("Failed on add delete trainer!", "danger");
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
