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
declare var pdfMake: any;

@Component({
    selector: 'app-taginvoice',
    templateUrl: './taginvoice.component.html',
    styleUrls: ['./taginvoice.component.scss']
})
export class TaginvoiceComponent {
    public reportList: Array<any> = [];
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });

    flag: any = '';
    name: any = '';
    hourOffset = 0;

    constructor(
        public colors: ColorsService,
        public http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private userInfo: UserService,
        private storage: StorageService,
        private mdToast: ToasterService,
    ) {

    }

    refreshInfo(flag, id) {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            HourOffset: this.hourOffset,
            LastId: 0,
            Count: -1,
        };

        let url;
        if (flag == 'USER') {
            params['UserReportId'] = id;
            url = EnvVariables.SERVER_ADDR + EnvVariables.REPORT_USER;
        } else {
            params['GymId'] = id;
            url = EnvVariables.SERVER_ADDR + EnvVariables.REPORT_GYM;
        }

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                if (list) {
                    list.map((item, index) => {
                        list[index]['No'] = index + 1;
                    });
                    this.reportList = list;
                } else {
                    this.reportList = [];
                }
            } else {
                this.toast("Failed on loading reports!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    exportPDF() {
        let header = ['No.', this.flag == 'USER' ? 'Gym' : 'User', 'Time', 'Equipment', 'Model', 'Serial Number'];

        let rows = [header];
        this.reportList.map(row => {
            let tableRow = [];
            tableRow.push(row.No);
            tableRow.push(this.flag == 'USER' ? row.gymName : row.userName);
            tableRow.push(row.use_date);
            tableRow.push(row.machineType);
            tableRow.push(row.model);
            tableRow.push(row.serial);
            rows.push(tableRow);
        });

        var docDefinition = {
            pageSize: {
                width: 1340,
                height: 1000,
            },
            content: [{
                table: {
                    headerRows: 1,
                    widths: [200, 200, 200, 200, 200, 200],
                    body: rows
                }
            }]
        };

        pdfMake.createPdf(docDefinition).download(this.name + ' report.pdf');
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