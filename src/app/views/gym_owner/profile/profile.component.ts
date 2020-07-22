import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { EnvVariables } from '../../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/storage/storage.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

    public firstName = '';
    public lastName = '';
    public password = '';
    public passwordC = '';
    public err = "";

    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });


    constructor(
        public colors: ColorsService,
        public http: Http,
        private router: Router,
        private userInfo: UserService,
        private storage: StorageService,
        private mdToast: ToasterService
    ) {
        this.firstName = userInfo.getUserInfo('first_name');
        this.lastName = userInfo.getUserInfo('last_name');
    }

    onUpdateProfile() {
        this.err = '';

        if (this.password != this.passwordC) {
            this.err = 'Confirm password failed!';
            return;
        }

        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        let check = strongRegex.test(this.password);
        if (!check) {
            this.err = 'Password must contains at least one uppercase, lowercase, number and special character, must be longer than 8 characters!';
            return;
        }

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            FirstName: this.firstName,
            LastName: this.lastName,
            Password: this.password,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.UPDATE_MANAGER;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.userInfo.updateUserInfo('first_name', this.firstName);
                this.userInfo.updateUserInfo('last_name', this.lastName);
                this.toast("Successfully updated profile!", "success");
            } else {
                this.toast("Failed on updating profile!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });

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
