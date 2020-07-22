import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { EnvVariables } from '../../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/storage/storage.service';

@Component({
    selector: 'app-equipment-detail1',
    templateUrl: './equipment-detail.component.html',
    styleUrls: ['./equipment-detail.component.scss']
})
export class EquipmentDetailComponent {

    timeFilter: any;
    timeFilterVal: any;
    equipment: any;

    // BAR
    // -----------------------------------
    timeUsageData: any;
    barOptions = {
        series: {
            bars: {
                align: 'center',
                lineWidth: 0,
                show: true,
                barWidth: 0.6,
                fill: 0.9
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,
        tooltipOpts: {
            content: function (label, x, y) { return x + ' : ' + y; }
        },
        xaxis: {
            tickColor: '#fcfcfc',
            mode: 'categories'
        },
        yaxis: {
            // position: ($scope.app.layout.isRTL ? 'right' : 'left'),
            tickColor: '#eee'
        },
        shadowSize: 0
    };

    // PIE
    // -----------------------------------
    genderUsageData: any;
    ageUsageData: any;

    pieOptions = {
        series: {
            pie: {
                show: true,
                innerRadius: 0,
                label: {
                    show: true,
                    radius: 0.8,
                    formatter: function (label, series) {
                        return '<div class="flot-pie-label">' +
                            // label + ' : ' +
                            Math.round(series.percent) +
                            '%</div>';
                    },
                    background: {
                        opacity: 0.8,
                        color: '#222'
                    }
                }
            }
        }
    };

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
        this.timeFilter = "Daily";
        this.timeFilterVal = 0;
        this.timeUsageData = [{
            "label": "Number of users",
            "color": "#9cd159",
            "data": [

            ]
        }];
        this.equipment = this.storage.getValue('SEL_EQUIPMENT');
        this.refreshInfo();
    }

    refreshInfo() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            EquipmentId: this.equipment.id,
            TimeFilter: this.timeFilterVal
        };

        let url;
        //this is part to change in the future.
        url = EnvVariables.SERVER_ADDR + EnvVariables.GET_EQUIPMENT_DETAIL;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let graphInfo = result.Data;
                let timeUsageArr = graphInfo.TimeUsage;
                var timeData = [];
                for (var i = 0; i < timeUsageArr.length; i++) {
                    let timeUsage = timeUsageArr[i];
                    let time = timeUsage.Time;
                    let usage = timeUsage.Num;
                    timeData[i] = [];
                    timeData[i].push(time);
                    timeData[i].push(usage);
                }

                this.timeUsageData = [{
                    "label": "Number of users",
                    "color": "#9cd159",
                    "data": timeData
                }];

                let genderUsage = graphInfo.GenderUsage;
                this.genderUsageData = [{
                    'label': 'Male',
                    'color': '#4acab4',
                    'data': genderUsage.Male
                }, {
                    'label': 'Female',
                    'color': '#ffea88',
                    'data': genderUsage.Female
                }];

                let ageUsage = graphInfo.AgeUsage;
                this.ageUsageData = [{
                    'label': 'Before 20',
                    'color': '#4acab4',
                    'data': ageUsage.Range1
                }, {
                    'label': '20 ~ 30',
                    'color': '#ffea88',
                    'data': ageUsage.Range2
                }, {
                    'label': '30 ~ 40',
                    'color': '#ff8153',
                    'data': ageUsage.Range3
                }, {
                    'label': '40 ~ 50',
                    'color': '#878bb6',
                    'data': ageUsage.Range4
                }, {
                    'label': 'After 50',
                    'color': '#b2d767',
                    'data': ageUsage.Range5
                }];
            } else {
                this.toast("Failed on loading users!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onDaily() {
        this.timeFilter = "Daily";
        this.timeFilterVal = 0;
        this.refreshInfo();
    }

    onWeekly() {
        this.timeFilter = "Weekly";
        this.timeFilterVal = 1;
        this.refreshInfo();
    }

    onMonthly() {
        this.timeFilter = "Monthly";
        this.timeFilterVal = 2;
        this.refreshInfo();
    }

    onYearly() {
        this.timeFilter = "Yearly";
        this.timeFilterVal = 3;
        this.refreshInfo();
    }

    onDetailImg(url) {
        var image = new Image();
        image.src = url;
        var w = window.open("");
        w.document.write(image.outerHTML);
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
