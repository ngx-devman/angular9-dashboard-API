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

@Component({
    selector: 'app-gym_trainer_client',
    templateUrl: './gym_trainer_client.component.html',
    styleUrls: ['./gym_trainer_client.component.scss']
})

export class GymTrainerClientComponent {

    @ViewChild('gMap',{static:false}) gMap: AgmMap;
    @ViewChild('gymDlg',{static:false}) gymDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    @ViewChild('mapDlg',{static:false}) mapDlg: ModalComponent;

    actionType = 0;
    trainerInfo: any = {};
    itemName = '';
    trainerName = this.storage.getValue('trainer_name');

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
        this.refreshInfo();
    }

    refreshInfo() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            TrainerId: this.storage.getValue('gym_trainer_id')
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.ATRAINER_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                });
                this.trainerList = list;
            } else {
                this.toast("Failed on loading trainers!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    displayWorkout(id) {
        localStorage.setItem('SEL_CLIENT_ID', id);
        this.router.navigate(['/trainer/workout']);
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
