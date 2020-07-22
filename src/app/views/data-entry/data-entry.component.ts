
import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
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
    selector: 'app-data-entry',
    templateUrl: './data-entry.component.html',
    styleUrls: ['./data-entry.component.scss']
})
export class DataEntryComponent {

    @ViewChild('addDlg',{static:false}) addDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;

    public techList: Array<any> = [];
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
        url = EnvVariables.SERVER_ADDR + EnvVariables.DATA_ENTRY_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                    list[index]['name'] = item.first_name + ' ' + item.last_name;
                });
                this.techList = list;
            } else {
                this.toast("Failed on loading techs!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onCreateManager() {
        this.addDlg.open();
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
        };

        let url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_DATA_ENTRY;
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

    onDelete(item) {
        this.manager = item;
        this.confirmDlg.open();
    }

    onConfirmDelete() {
        this.confirmDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            DataEntryId: this.manager.id,
        };

        let url = EnvVariables.SERVER_ADDR + EnvVariables.DELETE_DATA_ENTRY;

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on delete technician!", "success");
                this.refreshInfo();
            } else {
                this.toast("Failed on add delete technician!", "danger");
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
