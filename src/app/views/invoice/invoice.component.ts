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
import { ApiProvider } from '../../service/api';

declare var pdfMake: any;

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {

    public reportList: Array<any> = [];
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });

    flag: any = '';
    name: any = '';
    hourOffset = 0;
    //new api
    technicianName: any;
    job_id: any;
    jobData: any;
    type: any;
    dateTime: any;
    customerName: any;
    companyData:any;
    jobInfo:any;
    public companyName = '';
    public companyStreet = '';
    public companyCity = '';
    public companyState = '';
    public companyZipCode = '';
    public companyPhone = '';
    public companyFax = '';
    public firstName = '';
    public lastName = '';
    public email = "";
    public logoUrl = '';
    public comment = "";
    public description = "";
    constructor(
        public colors: ColorsService,
        public http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private userInfo: UserService,
        private storage: StorageService,
        private mdToast: ToasterService,
        private apiProvider: ApiProvider
    ) {
        // this.job_id = this.route.snapshot.queryParams["id"];
        // this.technicianName = this.route.snapshot.queryParams["technicianName"];
        // this.type = this.route.snapshot.queryParams['type'];
        // this.dateTime = this.route.snapshot.queryParams["dateTime"];
        // this.customerName = this.route.snapshot.queryParams["customer"];
        // this.comment = this.route.snapshot.queryParams["comment"];
        // this.companyName = this.route.snapshot.queryParams["companyName"];
        // this.description = this.route.snapshot.queryParams["description"];

        this.job_id = this.route.snapshot.queryParams["jobId"];
        this.description = this.route.snapshot.queryParams["description"];
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.apiProvider.getJobDetails(this.job_id).subscribe(data=>{
            console.log(data);
            console.log(data['job']);
            if(data['status'] == 1){
                this.jobInfo = data['job'];
            }else{
                this.toast(data['message'], "failed");
            }
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

    // formatDate(date) {
    //     let time = new Date(date);
    //     let year = time.getFullYear();
    //     let month = time.getMonth() + 1;
    //     let day = time.getDate();
    //     let hr: any = time.getHours();
    //     let min: any = time.getMinutes();
    //     let pm = 'AM';
    //     if (hr > 11) {
    //         pm = 'PM';
    //         hr = hr == 12 ? hr : hr - 12;
    //     }
    //     hr = hr > 9 ? '' + hr : '0' + hr;
    //     min = min > 9 ? '' + min : '0' + min;
    //     let dateStr = month + "/" + day + "/" + year
    //     return dateStr;
    // }

    formatDate(date) {

        if(date != null){
            var dateTime = date.substring(0, 10);
            var d = dateTime.split('-');
            return d[1] +'/'+ d[2] +'/'+ d[0];
        }else{
            return;
        }
        

    }
    formatTime(time) {
        if(time != null){
            var dateTime = time.substring(11, 16);
            var hourEnd = dateTime.indexOf(":");
            var H = +dateTime.substr(0, hourEnd);
            var h = H != 12 ? H % 12 : H;
            var ampm = H < 12 ? " AM" : " PM";
            time = h + dateTime.substr(hourEnd, 3) + ampm;
            return time;
        }else{
            return;
        }
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