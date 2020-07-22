import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Location } from '@angular/common';
import { ApiProvider } from '../../../service/api';

@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss']
})
export class BrandComponent {

    @ViewChild('brandDlg',{static:false}) brandDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    searchOpt: any = {
        brand: '',
    };
    public brandList: Array<any> = [];
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    })
    title: '';
    Brands: any;
    constructor(
        public colors: ColorsService,
        public http: Http,
        private userInfo: UserService,
        private mdToast: ToasterService,
        private location: Location,
        private apiProvide: ApiProvider
    ) {
        this.getBrand();
    }

    getBrand() {
        this.apiProvide.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            title: this.title
        }
        this.apiProvide.getEquipmentBrand(params).subscribe(response => {
            console.log("Brands", response)
            if (response['status'] == '1') {
                this.Brands = response['brands'];
                this.brandList = this.Brands
            }
        })
    }
    filterSearch() {
        let list = [];
        this.Brands.map(item => {
            if (this.searchOpt.brand.length > 0 && item.title.toLowerCase().indexOf(this.searchOpt.brand.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });
        return list;
    }

    addBrandToServer() {
        //new api
        this.apiProvide.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            title: this.title
        }
        this.apiProvide.createEquipmentBrand(params).subscribe(response => {
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
            }
            this.getBrand();
        })
    }

    onChangeValue(type, value) {
        if (value) {
            this.searchOpt[type] = value;
        }
        // Do Search function..
        this.brandList = this.filterSearch();
    }

    onCreateBrand() {
        this.brandDlg.open();
    }
    onConfirmBrand() {
        this.addBrandToServer();
        this.brandDlg.close();
    }

    onCancelBrand() {
        this.brandDlg.close();
    }
    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };
        this.mdToast.pop(toast);
    }
 
    addBrand(event: any) {
        this.brandList = this.filterSearch();
    }
    goBack() {
        this.location.back();
    }
}