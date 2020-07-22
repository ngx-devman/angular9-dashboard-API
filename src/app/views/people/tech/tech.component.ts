import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, PatternValidator } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Location } from '@angular/common';
import { ApiProvider } from '../../../service/api';
import { Router } from '@angular/router';
// import { ApiProvider } from '../../service/api';

@Component({
    selector: 'app-tech',
    templateUrl: './tech.component.html',
    styleUrls: ['./tech.component.scss']
})
export class TechComponent {

    @ViewChild('addDlg',{static:false}) addDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
   
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
    public techList: Array<any> = [];
    managerFrom: FormGroup;
    techname: any;
    searchOpt: any = {
        techname: '',
    };
    // new api
    email = '';
    password = '';
    firstName = '';
    lastName = '';
    phone = '';
    technicianData: any;
    userdata: any;
    role: any;
    isCollapsed: boolean = false;
    collapseId:any= -1;
    expandedId:any;
    employeeData:any =[];
    constructor(
        public colors: ColorsService,
        public http: Http,
        private userInfo: UserService,
        private mdToast: ToasterService,
        fb: FormBuilder, private location: Location,
        public apiProvider: ApiProvider,
        private router :Router
    ) {
        this.managerFrom = fb.group({
            'email': ['', Validators.compose([Validators.required, CustomValidators.email])],
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'password': ['', Validators.required],
            'phone': ['', Validators.required]
        });
        this.getTechnician();
        this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
        this.role = this.userdata['permissions']['role'];
    }
    collapsed(id): void {
    //    console.log("id",id);
    //   this.collapsedId = id;
      
    }

    customCollapse(id){


        if(this.collapseId != -1){

            if(this.collapseId == id){
                this.isCollapsed = !this.isCollapsed;
                
            }else{
                this.isCollapsed = true;
            }
        }else{
            this.isCollapsed = !this.isCollapsed;

        }
        this.collapseId = id;
        
        console.log(this.collapseId);
    }
    
      expanded(id): void {
        // console.log(" expand id",id);
        // this.expandedId = id;
      }
    getTechnician() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.apiProvider.getTechnician().subscribe(response => {
            console.log("tech response",response)
            if (response['status'] == '1') {
                this.technicianData = response['users'];
                this.techList = this.technicianData;
            }
        })
    }

    onCreateTechnician() {
        this.addDlg.open();
    }
    onCancelTechnician() {
        this.addDlg.close();
    }
    checkValidation() {
        this.onConfirmTechnician();
    }
    goToEmployee(item){
        console.log("item",item)
        this.employeeData = item
        let profile =item['pofile']
        this.router.navigate(['/newemployee'],{ queryParams: {"employeeData":JSON.stringify(item) }})
    }
    onConfirmTechnician() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone
        }
        console.log(params);
        this.apiProvider.createTechnician(params).subscribe(response => {
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
                this.getTechnician();
            }else{
                this.toast(response['message'], "failed");
            }
        })
        this.addDlg.close();
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
    goBack() {
        this.location.back();
    }
    filterSearch() {
        let list = [];
        this.technicianData.map(item => {
            if (this.searchOpt.techname.length > 0 && item.profile.displayName.toLowerCase().indexOf(this.searchOpt.techname.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });
        return list;
    }
    onChangeSearchValue(techname, value) {
        if (value) {
            this.searchOpt[techname] = value;
        }
        // Do Search function..
        this.techList = this.filterSearch();
    }
    onDelete(item){
        console.log("item",item)
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
        let params = {
            employeeId :item._id
        }
        this.apiProvider.deleteEmployee(params).subscribe(response =>{
            console.log("delete",response)
            if(response['status'] == '1')
            {
                this.toast(response['message'], "success");
                this.getTechnician();
            }
        })
    }
}