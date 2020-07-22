import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';


import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { EnvVariables } from '../../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AgmMap } from '@agm/core';

import { CalendarComponent } from '../../../components/calendar/calendar.component';
//import { Options } from 'fullcalendar';
declare var $: any;


@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

    @ViewChild('gMap',{static:false}) gMap: AgmMap;
    @ViewChild('gymDlg',{static:false}) gymDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    @ViewChild('mapDlg',{static:false}) mapDlg: ModalComponent;
    @ViewChild(CalendarComponent,{static:false}) ucCalendar: CalendarComponent;
    //calendarOptions: Options;

    actionType = 0;
    trainerInfo: any = {};
    itemName = '';
    selected = '';
    hourOffset = 0;

    public trainerList: Array<any> = [];
    public selTrainerIdx: any = null;

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
        const timeZoneOffset = new Date().getTimezoneOffset();
        this.hourOffset = -(timeZoneOffset / 60);
        this.refreshInfo();
    }

    ngOnInit() {
        // this.calendarOptions = {
        //     editable: true,
        //     eventLimit: false,
        //     header: {
        //         left: 'prev,next today',
        //         center: 'title',
        //         right: 'month'
        //     },
        //     events: [],
        // };
    }

    refreshInfo() {

    }

    eventClick(evt) {
        let day = evt.date.format('YYYY-MM-DD');
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Day: day,
            HourOffset: this.hourOffset,
        };

        $('.fc-day[data-date="' + this.selected + '"]').css('background', '');
        this.selected = day;
        $('.fc-day[data-date="' + this.selected + '"]').css('background', 'red');

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.TECH_HISTORY;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                if (list) {
                    list.map((item, index) => {
                        list[index]['No'] = index + 1;
                    });
                    this.trainerList = list;
                } else {
                    this.trainerList = [];
                }
            } else {
                this.toast("Failed on loading trainers!", "failed");
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
