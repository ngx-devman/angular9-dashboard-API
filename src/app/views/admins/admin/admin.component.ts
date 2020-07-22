import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Http } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { StorageService } from '../../../shared/storage/storage.service';
import { ApiProvider } from '../../../service/api';
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    @ViewChild('brandDlg',{static:false}) brandDlg: ModalComponent;
    @ViewChild('typeDlg',{static:false}) typeDlg: ModalComponent;
    @ViewChild('managerDlg',{static:false}) managerDlg: ModalComponent;
    @ViewChild('JobDlg',{static:false}) JobDlg: ModalComponent;
    @ViewChild('groupDlg',{static:false}) groupDlg: ModalComponent;
    @ViewChild('contractDlg',{static:false}) contractDlg: ModalComponent;
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
    Brands: any;
    typeData: any;
    brandtitle: any;
    typetitle: any;
    custom_add: any;
    grouptitle: any;

    subscriberrole = [
        { name: "Billing", click: "/main/billing", i: "fa fa-money" },
        { name: "Company Profile", click: "/company-profile", i: "fa fa-user fa fa-user-circle" },
        { name: "Roles", click: "/roles", i: "fa fa-user fa" },
        { name: "Add Brand", click: 1, i: "fa fa-tag" },
        { name: "Add Job", click: 2, i: "fa fa-user fa" },
        { name: "Add Group", click: 3, i: "fa fa-user fa" },
        { name: "Add Equipment Type", click: 4, i: "fa fa-wrench" },
        { name: "Remove User", click: "/main/removeUser", i: "fa fa-user fa" },
        // { name: "Authorize Outside Users", click:"/main/outsideUser", i: "fa fa-user fa" },
        { name: "Custom Work Orders", click: "/main/customWork", i: "fa fa-user fa" },
        // { name: "", click: "", i: "" },
        // { name: "Add Manager", click: 5, i: "fa fa-user fa" },
        // { name: "Add Technician", click: 6, i: "fa fa-wrench" },
        // { name: "", click: "", i: "" }
    ]
    roles = [
        { name: "Billing", click: "/main/billing", i: "fa fa-money" },
        // { name: "Roles", click: "/roles", i: "fa fa-user fa" },
        // { name: "Add Brand", click: 1, i: "fa fa-tag" },
        // { name: "Add Job", click: 2, i: "fa fa-user fa" },
        // { name: "Add Group", click: 3, i: "fa fa-user fa" },
        // { name: "Add Equipment Type", click: 4, i: "fa fa-wrench" },
        { name: "", click: "", i: "" },
        // { name: "Add Manager", click: 5, i: "fa fa-user fa" },
        // { name: "Add Technician", click: 6, i: "fa fa-wrench" },
        { name: "", click: "", i: "" }
    ]

    work = [
        { name: "Users:3" },
    ]
    items = [
        { 'id': 1, 'name': 'Maintenance' },
        { 'id': 2, 'name': 'Repair' },
        { 'id': 3, 'name': 'Diagnosis' },
        { 'id': 4, 'name': 'Installation' },
        { 'id': 5, 'name': 'Cleaning' },
    ];
    actionType = 0;
    equipmentType: any = '';
    info: any = {};
    name: any = '';
    isAdmin = 0;
    userType: any = '';
    status = 1;
    groupInfo: any = {};
    searchOpt: any = {
        brand: '',
        type: '',
        jobtype: '',
        groupname: ''
    };
    public allBrandList: Array<any> = [];
    public allTypeList: Array<any> = [];
    public userList: Array<any> = [];
    public brandList: Array<any> = [];
    public typeList: Array<any> = [];
    public jobList: Array<any> = [];
    public techList: Array<any> = [];
    public technicianList: Array<any> = [];
    public techManagerList: Array<any> = [];

    public manager: any = {
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        Email: '',
        Type: 1,
        list: [],
    };
    techManagerDict: any = {};
    public tech: any = {
        FirstName: '',
        LastName: '',
        PhoneNumber: '',
        Email: '',
        Type: 1,
        list: [],
    };
    types: any = '';
    typename: any = '';
    title: any;
    jobTypeData: any;
    userdata: any;
    role: any;
    public navItems: any;

    constructor(public colors: ColorsService,
        public http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private userInfo: UserService,
        private storage: StorageService,
        private mdToast: ToasterService, fb: FormBuilder, public apiProvider: ApiProvider) {
        this.equipmentType = 'HVAC';
        this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
        this.role = this.userdata['permissions']['role'];
        if (this.role == 3 || this.role == 0) {
            this.navItems = this.subscriberrole;
        }
        //  else if (this.role == 2 || this.role == 1 ) {
        //     this.navItems = this.roles;
        // }
    }

    ngOnInit() {
    }
    goToViewUser(){
        this.router.navigate(['/viewnewuser'])
    }
    navigate(url) {
        // window.location.href = url;
        this.router.navigate([url]);
    }

    onCancelBrand() {
        this.brandDlg.close();
    }

    onCancelType() {
        this.typeDlg.close();
    }

    onCreateBrand() {

        this.brandDlg.open();
    }
    onCreateType() {
        this.typeDlg.open();
    }
    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };
        this.mdToast.pop(toast);
    }

    onCreateJobType() {
        this.JobDlg.open();
    }
    onConfirmJobType() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            title: this.title
        }
        this.apiProvider.createJobType(params).subscribe(response => {
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
            } else {
                this.toast(response['message'], "failed");
            }
            this.JobDlg.close();
        })
    }
    onCancelJobType() {
        this.JobDlg.close();
    }
    getBrand() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            title: this.title
        }
        this.apiProvider.getEquipmentBrand(params).subscribe(response => {
            console.log("Brands", response)
            if (response['status'] == '1') {
                this.Brands = response['brands'];
                this.brandList = this.Brands
            }
        })
    }
    addBrandToServer() {
        //new api
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            title: this.brandtitle
        }
        this.apiProvider.createEquipmentBrand(params).subscribe(response => {
            console.log("brands", response)
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
            }
            this.getBrand();
        })
    }
    onCreateGroup() {
        this.groupDlg.open();
    }

    onAddContractor(){
        this.contractDlg.open();
    }

    onCancelAddContractor(){
        this.contractDlg.close();
    }

    onConfirmGroup() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            title: this.grouptitle
        }
        this.apiProvider.createGroup(params).subscribe(response => {
            console.log("groups", response)
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
            }
            else {
                this.toast(response['message'], "failed");
            }
            this.groupDlg.close();
        })
    }
    onCancelGroup() {
        this.groupDlg.close();
    }
    onDeleteUser() {

    }
    OnClick(click) {
        if (click == 1) {
            this.onCreateBrand();
        } else if (click == 2) {
            this.onCreateJobType();
        } else if (click == 4) {
            this.onCreateType();
        } else if (click == 3) {
            this.onCreateGroup();
        } 
        else {
            // window.location.href = click;
            this.router.navigate([click]);
        }
    }
    addBrand(event: any) {
        this.brandList = this.filterSearch();
    }
    addEquipType(event: any) {
        this.typeList = this.typefilterSearch();
    }
    addJobType(event: any) {
        this.jobList = this.jobfilterSerach();
    }
    filterSearch() {
        let list = [];
        this.allBrandList.map(item => {
            if (this.searchOpt.brand.length > 0 && item.name.toLowerCase().indexOf(this.searchOpt.brand.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });
        return list;
    }

    typefilterSearch() {
        let list = [];
        this.allTypeList.map(item => {
            if (this.searchOpt.type.length > 0 && item.typename.toLowerCase().indexOf(this.searchOpt.type.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });
        return list;
    }
   
    jobfilterSerach() {
        let list = [];
        this.items.map(item => {
            if (this.searchOpt.jobtype.length > 0 && item.name.toLowerCase().indexOf(this.searchOpt.jobtype.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });
        return list;
    }

    onConfirmBrand() {
        this.addBrandToServer();
        this.brandDlg.close();
    }

    onConfirmType() {
        this.addTypeToServer();
        this.typeDlg.close();
    }
    getIndustry() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            title: this.title,
        }
        this.apiProvider.getEquipmentTypes(params).subscribe(response => {
            if (response['status'] == '1') {
                this.typeData = response['types'];
                console.log(this.typeData);
            }
        })
    }
    addTypeToServer() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            title: this.typetitle,
        }
        /// new api
        this.apiProvider.createEquipmentType(params).subscribe(response => {
            if (response['status'] == "1") {
                this.toast(response['message'], "success");
                this.getIndustry();
            } else {
                this.toast(response['message'], "failed");
            }
        })
    }
    goToUser(){
        this.router.navigate(['/main/outsideUser'])
    }
}