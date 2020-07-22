import { Component,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ApiProvider } from '../../service/api';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
    @ViewChild('custDlg',{static:false}) custDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    @ViewChild('custeditDlg',{static:false}) custeditDlg: ModalComponent;

    public customerList: Array<any> = [];
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
    name: any;
    email: any;
    contactName: any;
    phone: any;
    street: any;
    city: any;
    state: any;
    zipCode: any;
    customer: any;
    customerdata: any;
    userdata: any;
    role: any;
    searchOpt: any = {
        name: '',
    };
    flag:any;
    customerId :any;
    public custList: Array<any> = [];
    customerFrom: FormGroup;
    listTableHeads = ['No', 'Name', 'Phone', 'Email', 'View'];
    activityTableHeads = ['Photo', 'Name', 'Recent Activity', 'Action'];
    activityData = [1, 2, 3, 4];
    editCustomer: boolean;
    jobsConfig: any = [
        {
            type: 'reports',
            title: 'Reports',
            route: '/customer/reports'
        },
        {
            type: 'jobs',
            title: 'Jobs',
            route: '/customer/jobs'
        },
        {
            type: 'tickets',
            title: 'Tickets',
            route: '/customer/tickets'
        }
    ]
    equipmentConfig: any = [
        {
            type: 'view',
            title: 'View',
            route: '/customer/view'
        }
    ]
    customerSyncDetails: { customersSynced: boolean; qbAuthorized: boolean; customersSyncedAt: string; };
    serviceStatus: ServiceStatus;

    constructor(
        public colors: ColorsService,
        public http: Http,
        private router: Router,
        private route: ActivatedRoute,
        private userInfo: UserService,
        private mdToast: ToasterService,
        public apiProvider: ApiProvider,
        private fb: FormBuilder
    ) {
        this.initiateComponent();
    }

    initiateComponent() {
        const routeParamId = this.route.snapshot.paramMap.get('id');
        if (routeParamId) {
            this.editCustomer = true;
            this.getCustomerDetails(routeParamId);
            this.getCustomerSyncData();
            return;
        }

        this.getCustomer('true', 'false');
        this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
        this.role = this.userdata['permissions']['role'];
        this.customerFrom = this.fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'name': [null, Validators.required],
        });

        this.getCustomerSyncData();
    }

    getCustomerSyncData(): void {
        this.apiProvider.getSyncInfo().subscribe(
            (res: {
                status: number;
                customersSynced: boolean;
                qbAuthorized: boolean;
                customersSyncedAt?: string;
            }) => {
                if (res.status === 1) {
                    const customerSyncData = { customersSynced: false, qbAuthorized: false, customersSyncedAt: '' }
                    customerSyncData.customersSynced = res.customersSynced;
                    customerSyncData.qbAuthorized = res.qbAuthorized;
                    if (customerSyncData.customersSynced) customerSyncData.customersSyncedAt = res.customersSyncedAt;

                    this.customerSyncDetails = { ...customerSyncData };
                }
            },
            (err) => console.log(err)
        );
    }

    getCustomerDetails (customerId: string) {
        this.apiProvider
        .getCustomerDetail({ customerId })
        .subscribe((res) => {
            // These are Input() that are used inside list-template.component.ts
            this.customer = res.customer;
        });
    }

    getCustomer(includeActive, includeNonActive) {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            includeActive: includeActive,
            includeNonActive: includeNonActive,
        }
        this.apiProvider.getCustomer(params).subscribe(response => {
            if (response['status'] == '1') {
                this.customerdata = response['customers'];
                this.custList = this.customerdata;
                console.log(this.customerdata);
            } else {
                this.toast(response['message'], "failed");
            }
        });

        this.serviceStatus = includeActive === 'true' ? ServiceStatus.ACTIVE : ServiceStatus.IN_ACTIVE;
    }

    onCreateCustomer() {
        this.flag = 0;
        // this.custDlg.open();
        this.router.navigate(['/newcustomer']);
    }
    onCancelCustomer() {
        this.custDlg.close();
        this.email = '';
        this.name = '';
        this.contactName = '';
        this.phone = '';
        this.city = '';
        this.state = '';
        this.street = '';
        this.zipCode = '';
    }
    addCustomerToServer() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            email: this.email,
            name: this.name,
            contactName: this.contactName,
            phone: this.phone,
            city: this.city,
            state: this.state,
            street: this.street,
            zipCode: this.zipCode,
        }
        this.apiProvider.createCustomer(params).subscribe(response => {
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
                this.getCustomer("true", "false");
                this.email='';
                this.name='';
                this.contactName='';
                this.phone='';
                this.city='';
                this.state='';
                this.street='';
                this.zipCode='';
            }else{
                this.toast(response['message'], "danger");
            }
        })
    }
    onConfirmCustomer() {
        if(this.flag){
            this.updateProfile();
        }else{
            this.addCustomerToServer();
        }
        this.custDlg.close();
    }
    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };
        this.mdToast.pop(toast);
    }

    filterSearch() {
        let list = [];
        try {
            this.customerdata.map(item => {
                if (this.searchOpt.name.length > 0 && item.info.name.toLowerCase().indexOf(this.searchOpt.name.toLowerCase()) == -1) {
                    return;
                }
                list.push(item);
            });
            return list;
        }
        catch (error) { }
    }

    onChangeSearchValue(name, value) {
        if (value) {
            this.searchOpt[name] = value;
        }
        this.custList = this.filterSearch();
    }

    onChangeStatus(status) {
        this.customer = status;
        this.custeditDlg.close();
        this.confirmDlg.open();
    }

    Equiplist(item) {
        let customer_id = item['_id'];
        let customer_name =item['info']['name'];
        console.log("info",customer_name)
        this.router.navigate(['/equipment'], { queryParams: { "_id": customer_id,"customer_name":customer_name }, skipLocationChange: true });
    }

    onEditCustomer(item){
        console.log(item);
        if(item.__t == "Company"){
            this.toast("Couldn't edit this customer", 'failed');
        } else{
            this.editSingleCustomer(item);
        }
        
    }

    editSingleCustomer(item){
        this.customerId = item._id;
        this.email = item.info != undefined ? item.info.email : '';
        this.name = item.info != undefined ? item.info.name : '';
        this.contactName = item.contact != undefined ? item.contact.name : '';
        this.phone = item.contact != undefined ? item.contact.phone : '';
        this.city = item.address != undefined ? item.address.city : '';
        this.state = item.address != undefined ? item.address.state : '';
        this.street = item.address != undefined ? item.address.street : '';
        this.zipCode  = item.address != undefined ? item.address.zipCode : '';
        this.flag = 1;
        this.apiProvider.updateSingleSharedCustomer(item);
        console.log(item);
        this.router.navigate(['/newcustomer']);
    }

    updateProfile() {
        //new api
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            customerId :this.customerId,
            email: this.email,
            name: this.name,
            contactName: this.contactName,
            phone: this.phone,
            city: this.city,
            state: this.state,
            street: this.street,
            zipCode: this.zipCode,
        }
        console.log("update params",params)
        this.apiProvider.updateCustomer(params).subscribe(response => {
            console.log("updated data",response)
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
                this.getCustomer("true", "false");
                this.email='';
                this.name='';
                this.contactName='';
                this.phone='';
                this.city='';
                this.state='';
                this.street='';
                this.zipCode='';
            } else{
                this.toast(response['message'], "danger");
            }
        })
    }

    goToVisitList(item){
        let customer_id = item['_id'];
        console.log("customer idddd",customer_id)
        let customer = item['info']['name'];
        this.router.navigate(['/schedule'], { queryParams: { "_id": customer_id, "customer":customer }, skipLocationChange: true });
    }

    // humayun updated code
    updateSearch(event){
        // console.log(event);
        this.searchOpt = event;
        this.custList = this.filterSearch();
    }
    
    updateCustomer(event){
        this.getCustomer(event.active, event.nonActive);
    }
}

enum ServiceStatus {
    ACTIVE = 'active',
    IN_ACTIVE = 'inactive'
}
