import { Component,ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
// import { ColorsService } from '../../shared/colors/colors.service';
// import { UserService } from '../../shared/users/user.service';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
// import { ApiProvider } from '../../service/api';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { ApiProvider } from '../../../service/api';
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
    constructor(
        public colors: ColorsService,
        public http: Http,
        private router: Router,
        private userInfo: UserService,
        private mdToast: ToasterService,
        public apiProvider: ApiProvider,
        fb: FormBuilder
    ) {
        this.getCustomer('true', 'false');
        this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
        this.role = this.userdata['permissions']['role'];
        this.customerFrom = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'name': [null, Validators.required],
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
                this.custList = this.customerdata
                console.log(this.custList); 
            } else {
                this.toast(response['message'], "failed");
            }
        })
    }

    onCreateCustomer() {
        this.flag = 0;
        this.router.navigate(['/newcustomer'])
        //this.custDlg.open();

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
        this.customerdata.map(item => {
            if (this.searchOpt.name.length > 0 && item.info.name.toLowerCase().indexOf(this.searchOpt.name.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });
        return list;
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
        var customer_data= {"_id": customer_id, "customer":customer_name }
        this.userInfo.changeName(customer_data)
        this.router.navigate(['/equipment']);
    }
    onEditCustomer(item){
        console.log(item);
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
        this.custDlg.open();
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
            }else{
                this.toast(response['message'], "danger");
            }
        })
    }
    goToVisitList(item){
        let customer_id = item['_id'];
        console.log("customer idddd",customer_id)
        let customer = item['info']['name'];
        var customer_data= {"_id": customer_id, "customer":customer }
        this.userInfo.changeName(customer_data)
        this.router.navigate(['/customers',customer]);
        
    }

}
