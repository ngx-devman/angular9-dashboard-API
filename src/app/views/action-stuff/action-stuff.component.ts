import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
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
    selector: 'app-action-stuff',
    templateUrl: './action-stuff.component.html',
    styleUrls: ['./action-stuff.component.scss']
})
export class ActionStuffComponent {
    @ViewChild('exerciseDlg',{static:false}) exerciseDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;

    actionType = 0;
    info: any = {};
    action: any;
    name: any = '';
    bodyPart: any = 'Pectorals (Chest)';

    public exerciseList: Array<any>;
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
        this.action = this.storage.getValue('SEL_ACTION');
        this.refreshInfo();
    }

    refreshInfo() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            ActionId: this.action.ActionId,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.ACTION_STUFF_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                });
                this.exerciseList = list;
            } else {
                this.toast("Failed on loading users!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    addExerciseToServer() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Stuff: this.name,
            ActionId: this.action.ActionId,
        }
        let url;
        if (this.actionType == 0) {
            url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_STUFF;
        } else {
            url = EnvVariables.SERVER_ADDR + EnvVariables.UPDATE_STUFF;
            params['StuffId'] = this.info.id;
        }
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                if (this.actionType == 0) {
                    this.toast("Success on add exercise!", "success");
                }
                else {
                    this.toast("Success on update exercise!", "success");
                }
                this.refreshInfo();
            } else {
                if (this.actionType == 0) {
                    this.toast("Failed on add exercise!", "danger");
                }
                else {
                    this.toast("Failed on update exercise!", "danger");
                }
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onBack() {
        this.router.navigate(['/main/techstuff']);
    }

    onCreateExercise() {
        this.actionType = 0;
        this.name = '';
        this.bodyPart = '';
        this.exerciseDlg.open();
    }

    onEditExercise(item) {
        this.actionType = 1;
        this.info = item;
        this.name = item.stuff;
        this.bodyPart = item.body_part;
        this.exerciseDlg.open();
    }

    onDeleteExercise(item) {
        this.info = item;
        this.confirmDlg.open();
    }

    onConfirmExercise() {
        this.addExerciseToServer();
        this.exerciseDlg.close();
    }

    onCancelExercise() {
        this.exerciseDlg.close();
    }

    onConfirmDelete() {
        this.confirmDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            ExerciseId: this.info.id,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.DELETE_EXERCISE;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on delete stuff!", "success");
                this.refreshInfo();
            } else {
                this.toast("Failed on add delete stuff!", "danger");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onCancelDelete() {
        this.confirmDlg.close();
    }

    onChangeBodyPart(value) {
        this.bodyPart = value;
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