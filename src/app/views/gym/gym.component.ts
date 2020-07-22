import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';


import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { EnvVariables } from '../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AgmMap } from '@agm/core';

@Component({
    selector: 'app-gym',
    templateUrl: './gym.component.html',
    styleUrls: ['./gym.component.scss']
})
export class GymComponent {

    @ViewChild('gMap',{static:false}) gMap: AgmMap;
    @ViewChild('gymDlg',{static:false}) gymDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    @ViewChild('mapDlg',{static:false}) mapDlg: ModalComponent;

    actionType = 0;
    gymInfo: any = {};
    itemName = '';
    phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    public customer: any = {
        Name: '',
        ContactName: '',
        Email: '',
        PhoneNumber: '',
        Street: '',
        City: '',
        State: '',
        ZipCode: '',
        Lat: '',
        Lng: '',
    };

    public gymList: Array<any> = [];
    public selGymIdx: any = null;

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
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.GYM_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                });
                this.gymList = list;
            } else {
                this.toast("Failed on loading gyms!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onDetailGym(item) {
        this.storage.setValue('SEL_GYM', item);
        this.router.navigate(['/main/gym-equipment']);
    }

    onCreateGym() {
        this.actionType = 0;
        this.gymInfo = {
            name: '',
            address: '',
        };

        this.gymDlg.open();
    }

    onShowGym() {
        this.mapDlg.open();
        this.gMap.triggerResize();
    }

    onClickGymOnMap(item) {
        this.itemName = item.name;
    }

    onEditGym(item) {
        this.actionType = 1;
        this.customer = {
            Id: item.id,
            Name: item.name,
            ContactName: item.contactName,
            Email: item.email,
            PhoneNumber: item.phoneNumber,
            Street: item.street,
            City: item.city,
            State: item.state,
            ZipCode: item.zipCode,
            Lat: item.lat,
            Lng: item.lng,
        };

        this.gymDlg.open();
    }

    onNumber(value) {
        return Number(value);
    }

    onConfirmAdd() {
        if (this.customer.Name == '') {
            this.toast("Input valid name!", "danger");
            return;
        }

        if (!this.validateEmail(this.customer.Email)) {
            this.toast("Input valid email!", "danger");
            return;
        }

        if (this.customer.PhoneNumber == '' || this.customer.ContactName == "" || this.customer.Street == "" || this.customer.City == "" || this.customer.State == "" || this.customer.ZipCode == "") {
            this.toast("Input valid other information!", "danger");
            return;
        }

        this.gymDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Email: this.customer.Email,
            Name: this.customer.Name,
            ContactName: this.customer.ContactName,
            PhoneNumber: this.customer.PhoneNumber,
            Street: this.customer.Street,
            City: this.customer.City,
            State: this.customer.State,
            ZipCode: this.customer.ZipCode,
            Lat: this.customer.Lat,
            Lng: this.customer.Lng,
        };
        let url;
        if (this.actionType == 0) {
            url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_GYM;
        } else {
            url = EnvVariables.SERVER_ADDR + EnvVariables.UPDATE_GYM;
            params['CustomerId'] = this.customer.Id;
        }

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                if (this.actionType == 0) {
                    this.toast("Success on add gym!", "success");
                } else {
                    this.toast("Success on update gym!", "success");
                }
                this.refreshInfo();
            } else {
                if (this.actionType == 0) {
                    this.toast("Failed on add gym!", "danger");
                } else {
                    this.toast("Failed on update gym!", "danger");
                }
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onCancelAdd() {
        this.gymDlg.close();
    }

    onCancelMap() {
        this.mapDlg.close();
    }

    onDeleteGym(item) {
        this.customer = item;
        this.confirmDlg.open();
    }

    onConfirmDelete() {
        this.confirmDlg.close();

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            CustomerId: this.customer.id,
        };
        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.DELETE_GYM;

        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on delete gym!", "success");
                this.refreshInfo();
            } else {
                this.toast("Failed on add delete!", "danger");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }

    onCancelDelete() {
        this.confirmDlg.close();
    }


    onReportGym(item) {
        let gym = item;
        this.storage.setValue('REPORT_ID', gym.id);
        this.storage.setValue('REPORT_FLAG', 'GYM');
        this.storage.setValue('REPORT_NAME', gym.name);
        this.router.navigate(['/main/report']);
    }

    onGetLocation() {
        var address = this.customer.Street + " " + this.customer.City + " " + this.customer.State + " " + this.customer.ZipCode;
        address = encodeURIComponent(address);
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Address: address,
        };
        let url = EnvVariables.SERVER_ADDR + EnvVariables.GET_LOCATION;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.status == "OK") {
                var location = result.results[0].geometry.location;
                this.customer.Lat = location.lat;
                this.customer.Lng = location.lng;
            }
            else {
                this.toast("Can't get location", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }
    validateEmail(email) {
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
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
