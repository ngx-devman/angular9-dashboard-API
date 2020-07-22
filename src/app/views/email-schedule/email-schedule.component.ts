import { Component, OnInit, ViewChild } from '@angular/core';

import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TranslatePipe } from "@ngx-translate/core";
import { UserService } from '../../shared/users/user.service';
import { EnvVariables } from '../../service/env-variables';
import { Router } from '@angular/router';
import { ElementRef } from "@angular/core";

import { ApplicationRef, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs/Rx";
import { StorageService } from '../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
@Component({
    selector: 'app-email-schedule',
    templateUrl: './email-schedule.component.html',
    styleUrls: ['./email-schedule.component.scss']
})
export class EmailScheduleComponent {
    @ViewChild('addDlg',{static:false}) addDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    settings: any;

    public showDialog = false;
    actionType = 0;
    dateTimeLocal: Date;

    public techList: Array<any> = [];
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });

    public items: any = [];
    marginDlg = 220;

    public mail: any = {
        Name: '',
        Description: '',
        ckeditorContent: ''
    };
    constructor(
        public http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private userInfo: UserService,
        private storage: StorageService,
        private mdToast: ToasterService,
        private datePipe: TranslatePipe,
        private test: ElementRef
    ) {
        this.refreshInfo();
    }

    ngOnInit() {
        this.settings = {
            bigBanner: true,
            timePicker: false,
            format: 'MM-dd-yyyy',
            defaultOpen: false
        }
    }

    refreshInfo() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.EMAIL_SCHEDULE_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                });
                this.techList = list;
            } else {
                this.toast("Failed on loading email templates!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onCreateEmailTemplate() {
        // this.addDlg.open();
        this.dateTimeLocal = new Date();
        this.showDialog = true;
    }

    onCancelEmailTemplate() {
        // this.addDlg.close();
        this.showDialog = false;
    }

    onConfirmEmailTemplate() {
        if (this.mail.Name == '') {
            this.toast("Input valid Name", "danger");
            return;
        }

        if (this.mail.Description == '' || this.mail.Description == undefined) {
            this.toast("Input valid Description!", "danger");
            return;
        }

        if (this.mail.ckeditorContent == '') {
            this.toast("Input valid Mail Template", "danger");
            return;
        }

        //var dateFormat = require('dateformat');
        var scheduleDateTime = this.datePipe.transform(this.dateTimeLocal.toDateString(), "yyyy-mm-dd");
        //var scheduleDateTime = dateFormat(this.dateTimeLocal, "yyyy-mm-dd");
        var fireDate = scheduleDateTime;
        let data = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            FireDate: fireDate,
            Name: this.mail.Name,
            Template: this.mail.ckeditorContent,
            Description: this.mail.Description,
        };

        let url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_EMAIL_SCHEDULE;
        if (this.actionType == 1) {
            data['ScheduleId'] = this.mail.Id;
            url = EnvVariables.SERVER_ADDR + EnvVariables.UPDATE_EMAIL_SCHEDULE;
        }

        this.http.post(url, data).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.mail.Name = '';
                this.mail.ckeditorContent = '';
                this.mail.Description = '';
                this.mail.FireDate = '';
                if (this.actionType == 0) {
                    this.toast("Success on creating email template!", "success");
                }
                else {
                    this.toast("Success on updating email template!", "success");
                }
                this.refreshInfo();
            } else {
                if (this.actionType == 0) {
                    this.toast("Failed on creating email template!", "danger");
                }
                else {
                    this.toast("Failed on updating email template!", "danger");
                }
            }
        }, error => {
            this.toast("Error on http request!", "danger");
        });

        this.showDialog = false;
        // this.addDlg.close();
    }

    onDelete(item) {
        this.actionType = 0;
        this.mail = item;
        this.confirmDlg.open();
    }

    onEdit(item) {
        this.actionType = 1;
        this.mail = item;

        var dateStr = this.mail.FireDate;
        var year = parseInt(dateStr.substring(0, 4));
        var month = parseInt(dateStr.substring(5, 7));
        var day = parseInt(dateStr.substring(8, 10));
        this.dateTimeLocal = new Date(year, month - 1, day, 0, 0);
        this.mail.ckeditorContent = item.Template;
        this.showDialog = true;
    }

    onConfirmDelete() {
        this.confirmDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            EmailTemplateId: this.mail.Id,
        };
        let url = EnvVariables.SERVER_ADDR + EnvVariables.DELETE_EMAIL_SCHEDULE;

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on delete email template!", "success");
                this.refreshInfo();
            } else {
                this.toast("Failed on add email template!", "danger");
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

