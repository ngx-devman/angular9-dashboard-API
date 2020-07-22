import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Http } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { StorageService } from '../../shared/storage/storage.service';
import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { EnvVariables } from '../../service/env-variables';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ApiProvider } from '../../service/api';

import {
  CdkDrag,
  CdkDragStart,
  CdkDropList, CdkDropListGroup, CdkDragMove, CdkDragEnter,
  moveItemInArray
} from "@angular/cdk/drag-drop";
import {ViewportRuler} from "@angular/cdk/overlay";
import { MatDialog } from '@angular/material';
import { DefaultModelComponent } from '../../shared/components/default-model/default-model.component';

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
    @ViewChild('techDlg',{static:false}) techDlg: ModalComponent;
    @ViewChild('groupDlg',{static:false}) groupDlg: ModalComponent;
// for drag and drop
    @ViewChild(CdkDropListGroup, { static: false }) optionlistGroup: CdkDropListGroup<CdkDropList>;
    @ViewChild(CdkDropList, { static: false }) placeholder: CdkDropList;

    currentStartingNumber:startingNumber = new startingNumber();

    public optionItems: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    public target: CdkDropList;
    public targetIndex: number;
    public source: CdkDropList;
    public sourceIndex: number;
    public dragIndex: number;
    public activeContainer;
// end drag and drop
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
    Brands:any;
    typeData:any;
    brandtitle:any;
    typetitle:any;
    custom_add: any;

    subscriberrole = [
        { name: "Billing", click: "/main/billing", i: "attach_money", color: '#DF4C45'},
        { name: "Company Profile", click: "/company-profile", i: "emoji_transportation", color: '#149CE6'},
        { name: "Brands", click: 1, i: "local_offer", color: '#505560'},
        { name: "Equipment Type", click: 4, i: "build", color: '#505560'},
        { name: "Job Types", click: 2, i: "business_center", color: '#505560'},
        { name: "Groups", click: "/group", i: "group", color: '#149CE6'},
        { name: "Roles/Permissions", click: "/roles", i: "how_to_reg", color: '#149CE6'},
        { name: "Employees", click: "/employees", i: "person", color: '#149CE6'},
        { name: "Vendors", click: "/vendors", i: "person_outline", color: '#149CE6'},
        { name: 'Report Number', click: 7, i: "insert_drive_file", color: '#505560'},
        { name: "Invoicing", click: "/invoice", i: "insert_drive_file", color: '#149CE6'},
        // { name: "New User", click: "/newuser", i: "person", color: '#0082c3' },
        // { name: "Add Manager", click: 5, i: "fa fa-user fa", color: '#607d8b' },
        // { name: "Add Technician", click: 6, i: "build", color: '#56d10f' },"fa fa-money"
        // { name: "", click: "", i: "" }
    ]
    roles = [
        { name: "Billing", click: "/main/billing", i: "attach_money", color: '#DF4C45'},
        // { name: "Company Profile", click: "/company-profile", i: "emoji_transportation", color: '#49b8ff' },
        // { name: "Company Profile", click: "/company-profile", i: "emoji_transportation", color: '#49b8ff' },
        { name: "Roles/Permissions", click: "/roles", i: "how_to_reg", color: '#149CE6'},
        { name: "Brands", click: 1, i: "local_offer", color: '#505560'},
        { name: "Job Types", click: 2, i: "business_center", color: '#505560'},
        { name: "Groups", click: "/group", i: "group", color: '#149CE6'},
        { name: "Equipment Type", click: 4, i: "build", color: '#505560'},
        { name: "Employees", click: "/employees", i: "person", color: '#149CE6'},
        { name: "Vendors", click: "/vendors", i: "person_outline", color: '#149CE6'},
        { name: 'Report Number', click: 7, i: "insert_drive_file", color: '#505560'},
        { name: "Invoicing", click: "/invoice", i: "insert_drive_file", color: '#149CE6'},
        // { name: "New User", click: "/newuser", i: "person", color: '#0082c3' },
        // { name: "Add Manager", click: 5, i: "fa fa-user fa", color: '#607d8b' },
        // { name: "Add Technician", click: 6, i: "build", color: '#56d10f' },
    ]

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
    selTechManager: any = { "first_name": "" };
    managerFrom: FormGroup;
    techFrom: FormGroup;
    public listGroup: Array<any> = [];
    public groupList: Array<any> = [];
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

    items = [
        { 'id': 1, 'name': 'Maintenance' },
        { 'id': 2, 'name': 'Repair' },
        { 'id': 3, 'name': 'Diagnosis' },
        { 'id': 4, 'name': 'Installation' },
        { 'id': 5, 'name': 'Cleaning' },
    ];
    types: any = '';
    typename: any = '';
    //new api
    title: any;
   
    jobTypeData: any;
    userdata: any;
    role: any;
    public navItems: any;

    timePeriods = [
        'Bronze age',
        'Iron age',
        'Middle ages',
        'Early modern period',
        'Long nineteenth century',
        'Bronze age',
        'Iron age',
        'Middle ages',
        'Early modern period',
        'Long nineteenth century'
      ];
    
    vamps = [
        { name: "Bad Vamp" },
        { name: "Petrovitch the Slain" },
        { name: "Bob of the Everglades" },
        { name: "The Optimistic Reaper" }
    ];

    vamps2 = [
        { name: "Dracula" },
        { name: "Kurz" },
        { name: "Vladislav" },
        { name: "Deacon" }
    ];

    constructor(public colors: ColorsService,
        public http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private userInfo: UserService,
        private storage: StorageService,
        private mdToast: ToasterService, 
        fb: FormBuilder, 
        public apiProvider: ApiProvider,
        // for drag
        private viewportRuler: ViewportRuler,
        private dialog:MatDialog
        // end for drag
    ) {
        // for drage
        this.target = null;
        this.source = null;
        // end for drage
        this.equipmentType = 'HVAC';
        this.managerFrom = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'firstName': [null, Validators.required],
            'lastName': [null, Validators.required],
            'phoneNumber': [null],
        });
        this.techFrom = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'firstName': [null, Validators.required],
            'lastName': [null, Validators.required],
            'phoneNumber': [null],
        });
        this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
        this.role = this.userdata['permissions']['role'];
        if (this.role == 3 || this.role == 2) {
            this.navItems = this.subscriberrole;
        } else if (this.role == 0 || this.role == 1 ) {
            this.navItems = this.roles;
            // this.navItems = this.subscriberrole;

        }

        this.apiProvider.getVendors().subscribe((contracts:any) => {
            console.log(contracts);
        });
    }

    ngOnInit() {
        let companyInfo = JSON.parse(this.userInfo.getUserData('company'));
        let comPrefix = null;
        this.currentStartingNumber.currentNumber = companyInfo.currentJobId;
        this.currentStartingNumber.prefix = comPrefix;
        console.log(this.currentStartingNumber);
        // this.dragulaService.createGroup("VAMPIRES", {
        //     // ...
        //   });
      
        // this.dragulaService.create
        // this.dragulaService.dropModel("VAMPIRES").subscribe(args => {
        // console.log(args);
        // });
        this.navItems.sort((a,b) => {
        if ( a.name < b.name ){
            return -1;
            }
            if ( a.name > b.name ){
            return 1;
            }
            return 0;
        });
        this.apiProvider.getReportNumber().subscribe((number:any) => {
            if(number.status != 0){
                this.currentStartingNumber.currentNumber = number.currentWorkOrderNumber;
                this.currentStartingNumber.prefix = number.prefix;
                console.log(this.currentStartingNumber);
            }
        });
    }
// ****** for drag and drop  *******
    ngAfterViewInit() {
        let phElement = this.placeholder.element.nativeElement;
    
        phElement.style.display = 'none';
        phElement.parentElement.removeChild(phElement);
    }
    add() {
        this.navItems.push(this.navItems.length + 1);
      }
    
      shuffle() {
        this.navItems.sort(function() {
          return .5 - Math.random();
        });
      }
    
      dragMoved(e: CdkDragMove) {
        let point = this.getPointerPositionOnPage(e.event);
    
        this.optionlistGroup._items.forEach(dropList => {
          if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
            this.activeContainer = dropList;
            return;
          }
        });
      }
    
      dropListDropped(event) {
        if (!this.target)
          return;
    
        let phElement = this.placeholder.element.nativeElement;
        let parent = phElement.parentElement;
    
        phElement.style.display = 'none';
    
        parent.removeChild(phElement);
        parent.appendChild(phElement);
        parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);
    
        this.target = null;
        this.source = null;
    
        if (this.sourceIndex != this.targetIndex)
          moveItemInArray(this.navItems, this.sourceIndex, this.targetIndex);
      }
    
      dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
        if (drop == this.placeholder)
          return true;
    
        if (drop != this.activeContainer)
          return false;
    
        let phElement = this.placeholder.element.nativeElement;
        let sourceElement = drag.dropContainer.element.nativeElement;
        let dropElement = drop.element.nativeElement;
    
        let dragIndex = __indexOf(dropElement.parentElement.children, (this.source ? phElement : sourceElement));
        let dropIndex = __indexOf(dropElement.parentElement.children, dropElement);
    
        if (!this.source) {
          this.sourceIndex = dragIndex;
          this.source = drag.dropContainer;
    
          phElement.style.width = sourceElement.clientWidth + 'px';
          phElement.style.height = sourceElement.clientHeight + 'px';
          
          sourceElement.parentElement.removeChild(sourceElement);
        }
    
        this.targetIndex = dropIndex;
        this.target = drop;
    
        phElement.style.display = '';
        dropElement.parentElement.insertBefore(phElement, (dropIndex > dragIndex 
          ? dropElement.nextSibling : dropElement));
    
        this.placeholder.enter(drag, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
        return false;
      }
      
      /** Determines the point of the page that was touched by the user. */
      getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
        // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
        const point = __isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
            const scrollPosition = this.viewportRuler.getViewportScrollPosition();
    
            return {
                x: point.pageX - scrollPosition.left,
                y: point.pageY - scrollPosition.top
            };
        }
// end drag and drop

    navigate(url) {
        // window.location.href = url;
        this.router.navigate([url]);
    }

    onCreateManager() {
        this.managerDlg.open();
    }

    onCancelGroupAdd() {
        this.groupDlg.close();
    }

    onCancelBrand() {
        this.brandDlg.close();
    }

    onCancelType() {
        this.typeDlg.close();
    }

    onCreateBrand() {
        this.router.navigate(['/brand']);
        // this.brandDlg.open();
    }
    onCreateType() {
        // this.typeDlg.open();
        this.router.navigate(['/type']);
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
        // this.JobDlg.open();
        this.router.navigate(['/jobs']);
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
            debugger;
            console.log("brands",response)
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
            }
            this.getBrand();
        })
    }
    onCreateTechnician() {
        this.techDlg.open();
    }

    onCancelTechnician() {
        this.techDlg.close();
    }
    onCreateGroup() {
        this.groupDlg.open();
    }

    OnClick(click) {
        if (click == 1) {
            this.onCreateBrand();
        }
        else if (click == 2) {
            this.onCreateJobType();
        }
        else if (click == 3) {
            this.onCreateGroup();

        }
        else if (click == 4) {
            this.onCreateType();
        }
        else if (click == 5) {
            this.onCreateManager();
        }
        else if (click == 6) {
            this.onCreateTechnician();
        }
        else if (click == 7) {
            this.onClickReportNumber();
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
    addGroup(event: any) {
        this.listGroup = this.groupfilter();
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

    onClickReportNumber(){
        const dialogRef = this.dialog.open(DefaultModelComponent, {
            data: this.generateModelValues(),
            width: '474px',
            panelClass: 'defaultModel'
        })

        dialogRef.afterClosed().subscribe((data) => {
            if(data.data.createNew){
                let body = {
                    workOrderNumber: data.data.dataValues.initialNumber,
                    prefix: data.data.dataValues.hyphenNumber,
                }
                
                this.apiProvider.customWorkOrderNumber(body).subscribe((response:any) => {
                    if(response.status == 1){
                        let companyInfo = JSON.parse(this.userInfo.getUserData('company'));
                        companyInfo.currentJobId = body.workOrderNumber;
                        companyInfo.prefix = data.data.dataValues.hyphenNumber;
                        this.currentStartingNumber.currentNumber = body.workOrderNumber;
                        this.currentStartingNumber.prefix = data.data.dataValues.hyphenNumber;
                        this.userInfo.setUserdata('company', companyInfo);
                        this.mdToast.pop('success', '', 'The Starting Number is update');
                    }
                });
            }
        });
    }

    generateModelValues(){
        // let companyInfo = this.currentStartingNumber.currentNumber;
        // let comPrefix = this.currentStartingNumber.prefix;
        // if(companyInfo.prefix){
        //     comPrefix = companyInfo.prefix;
        // }
        let dataInput = {
            initialNumber: 'Starting Number',
            hyphen: 'Prefix'
        }
        let dataValues = {
            title: 'Report Starting Number',
            status: 'reportNumber',
            initialNumber: this.currentStartingNumber.currentNumber,
            hyphenNumber: this.currentStartingNumber.prefix,
            editNumber: false,
            cusHeight: true
        }
        
        let data = {
            dataInputs: dataInput,
            dataValues: dataValues
        }
        return data;
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
    groupfilter() {
        let list = [];
        this.groupList.map(item => {

            if (this.searchOpt.groupname.length > 0 && item.name.toLowerCase().indexOf(this.searchOpt.groupname.toLowerCase()) == -1) {
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
                console.log(this.typeData)
                
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

    onConfirmGroupAdd() {

        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Name: this.groupInfo.Name
        };

        let url;
        if (this.actionType == 0) {
            url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_GROUP;
        } else {
            url = EnvVariables.SERVER_ADDR + EnvVariables.UPDATE_GROUP;
            params['GroupId'] = this.groupInfo.Id;
        }
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                if (this.actionType == 0) {
                    this.toast("Success on add group!", "success");
                } else {
                    this.toast("Success on update group!", "success");
                }
                this.refreshgroupInfo();
            } else {
                if (this.actionType == 0) {
                    this.toast("Failed on add group!", "danger");
                } else {
                    this.toast("Failed on update group!", "danger");
                }
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
        this.groupDlg.close();
    }
    refreshgroupInfo() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            // Name: this.groupInfo.Name
        };
        let url = EnvVariables.SERVER_ADDR + EnvVariables.GROUP_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                });
                this.groupList = list;
                this.listGroup = list;
            } else {
                this.toast("Failed on loading groups!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }
    checkValidation() {
        for (let controller in this.managerFrom.controls) {
            this.managerFrom.get(controller).markAsTouched();
        }
        if (this.managerFrom.invalid) {
            return false;
        }
        else {
            //this.onSignUpNow();
            this.onConfirmManager();
        }

    }
    onConfirmManager() {
        let data = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Email: this.manager.Email,
            FirstName: this.manager.FirstName,
            LastName: this.manager.LastName,
            PhoneNumber: this.manager.PhoneNumber,
            Type: this.manager.Type,
            Status: this.status
        };

        if (this.manager.Type == 1) {
            let count = this.manager.list.length;
            data['Count'] = count;

            for (var i = 0; i < count; i++) {
                let brand = this.manager.list[i];
                data['BrandId' + i] = brand.id;
            }
        } else {
            data['GymId'] = this.manager.list.id;
        }

        let url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_MANAGER;
        this.http.post(url, data).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on creating manager!", "success");
                this.refreshInfo(1);
            } else {
                this.toast("Failed on creating manager!", "danger");
            }
        }, error => {
            this.toast("Error on http request!", "danger");
        });
        this.managerDlg.close();
    }
    refreshInfo(i) {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Type: this.userInfo.getUserInfo('type'),
            LastId: 0,
            Count: -1,
            Status: i
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.MANAGER_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                    list[index]['name'] = item.firstName + ' ' + item.lastName;
                });
                this.userList = list;
            } else {
                this.toast("Failed on loading users!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }
    onCancelManager() {

        this.managerFrom.reset();
        this.managerDlg.close();
    }
    checkTechValidatio() {
        for (let controller in this.techFrom.controls) {
            this.techFrom.get(controller).markAsTouched();
        }
        if (this.techFrom.invalid) {
            return false;
        }
        else {
            //this.onSignUpNow();
            this.onConfirmTechnician();
        }
    }

    onConfirmTechnician() {
        if (this.tech.FirstName == '') {
            this.toast("Input valid first name!", "danger");
            return;
        }

        if (this.tech.LastName == '') {
            this.toast("Input valid last name!", "danger");
            return;
        }

        if (!this.validateEmail(this.tech.Email)) {
            this.toast("Input valid email!", "danger");
            return;
        }
        let data = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            Email: this.tech.Email,
            FirstName: this.tech.FirstName,
            LastName: this.tech.LastName,
            PhoneNumber: this.tech.PhoneNumber,
            EquipmentType: this.equipmentType,
            TechManagerId: this.selTechManager.id,
            UserType: this.selTechManager.userType,
            Status: 1

        };
        let url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_TECH;
        this.http.post(url, data).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                this.toast("Success on creating technician!", "success");
                this.refreshTech();
            } else {
                this.toast("Failed on creating technician!", "danger");
            }
        }, error => {
            this.toast("Error on http request!", "danger");
        });
        this.techDlg.close();
    }
    validateEmail(email) {
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
    }
    refreshTech() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.TECH_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if (result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                    list[index]['name'] = item.firstName + ' ' + item.lastName;
                    list[index]['phonenumber'] = item.phoneNumber;
                });
                this.techList = list;
                this.technicianList = list;
            } else {
                this.toast("Failed on loading techs!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }
}

function __indexOf(collection, node) {
    return Array.prototype.indexOf.call(collection, node);
};
  
/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return event.type.startsWith('touch');
}

function __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
    const {top, bottom, left, right} = dropList.element.nativeElement.getBoundingClientRect();
    return y >= top && y <= bottom && x >= left && x <= right; 
}
export class startingNumber{
    currentNumber:any;
    prefix:any;
}