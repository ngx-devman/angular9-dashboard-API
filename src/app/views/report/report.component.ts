import { validate } from "codelyzer/walkerFactory/walkerFn";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Http } from "@angular/http";
import {
  ActivatedRoute,
  UrlTree,
  UrlSegmentGroup,
  UrlSegment,
  PRIMARY_OUTLET,
  Params
} from "@angular/router";
import { ToasterService, Toast, ToasterConfig } from "angular2-toaster";

import { ColorsService } from "../../shared/colors/colors.service";
import { UserService } from "../../shared/users/user.service";
import { EnvVariables } from "../../service/env-variables";
import { Router } from "@angular/router";
import { StorageService } from "../../shared/storage/storage.service";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";

import * as AWS from "aws-sdk/global";
import * as S3 from "aws-sdk/clients/s3";
import { ApiProvider } from '../../service/api';
// import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
// import { Cell, Row, Table } from 'ng-pdf-make/objects/table';

declare var pdfMake: any;

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit{
  public reportList: Array<any> = [];
  public config: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right"
  });

  flag: any = "";
  name: any = "";
  hourOffset = 0;
  currentReport;
  constructor(
    public colors: ColorsService,
    public http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private userInfo: UserService,
    private storage: StorageService,
    private mdToast: ToasterService,
    private apiProvider: ApiProvider
  ) // private pdfmake: PdfmakeService
  {
    // -----get timezone
    const timeZoneOffset = new Date().getTimezoneOffset();
    this.hourOffset = -(timeZoneOffset / 60);
    let id = this.storage.getValue('REPORT_ID');
    this.flag = this.storage.getValue('REPORT_FLAG');
    this.name = this.storage.getValue('REPORT_NAME');
    console.log(this.flag);
    console.log(id);
    if (id && this.flag) {
        // this.refreshInfo(this.flag, id);
    } else {
        // this.router.navigate(['/main/gym']);
    }
  }

  ngOnInit(){
    this.route.params.subscribe((params:Params) => {
      if(params){
        let body = {
          jobId: params.id
        }
        this.apiProvider.getReport(body).subscribe((report:any) => {
          console.log(report);
          report.job.jobId = report.job.jobId.replace('Job', '');
          this.currentReport = report;
        });
      }
    });
    // this.apiProvider.getReport()
  }

  refreshInfo(flag, id) {
    let params = {
      UserId: this.userInfo.getUserInfo("id"),
      Token: this.userInfo.getUserInfo("token"),
      HourOffset: this.hourOffset,
      LastId: 0,
      Count: -1
    };
    let url;
    if (flag == "USER") {
      params["UserReportId"] = id;
      url = EnvVariables.SERVER_ADDR + EnvVariables.REPORT_USER;
    } else {
      params["GymId"] = id;
      url = EnvVariables.SERVER_ADDR + EnvVariables.REPORT_GYM;
    }

    this.http.post(url, params).subscribe(
      response => {
        console.log(response);
        let result = response.json();
        if (result.Success == true) {
          let list = result.Data;
          if (list) {
            list.map((item, index) => {
              list[index]["No"] = index + 1;
            });
            this.reportList = list;
          } else {
            this.reportList = [];
          }
        } else {
          this.toast("Failed on loading reports!", "failed");
        }
      },
      error => {
        this.toast("Error on http request!", "failed");
      }
    );
  }

  exportPDF() {
    let header = [
      "No.",
      this.flag == "USER" ? "Gym" : "User",
      "Time",
      "Equipment",
      "Model",
      "Serial Number"
    ];

    let rows = [header];
    this.reportList.map(row => {
      let tableRow = [];
      tableRow.push(row.No);
      tableRow.push(this.flag == "USER" ? row.gymName : row.userName);
      tableRow.push(row.use_date);
      tableRow.push(row.machineType);
      tableRow.push(row.model);
      tableRow.push(row.serial);
      rows.push(tableRow);
    });

    var docDefinition = {
      pageSize: {
        width: 1340,
        height: 1000
      },
      content: [
        {
          table: {
            headerRows: 1,
            widths: [200, 200, 200, 200, 200, 200],
            body: rows
          }
        }
      ]
    };

    pdfMake.createPdf(docDefinition).download(this.name + " report.pdf");
  }

  formatDate(date) {
    let time = new Date(date);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hr: any = time.getHours();
    let min: any = time.getMinutes();
    let pm = "AM";
    if (hr > 11) {
      pm = "PM";
      hr = hr == 12 ? hr : hr - 12;
    }

    hr = hr > 9 ? "" + hr : "0" + hr;
    min = min > 9 ? "" + min : "0" + min;
    let dateStr =
      month + "/" + day + "/" + year + " " + hr + ":" + min + " " + pm;
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
