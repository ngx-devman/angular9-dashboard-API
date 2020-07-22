import { Component, ViewEncapsulation, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Http } from "@angular/http";
import { ToasterService, Toast, ToasterConfig } from "angular2-toaster";
import { ColorsService } from "../../shared/colors/colors.service";
import { UserService } from "../../shared/users/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { ApiProvider } from "../../service/api";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { usStates } from './us-states';
import { SaveComponentCanDeactivate } from '../../guard/deactivate-guard';
import { Observable } from 'rxjs';

@Component({
  selector: "app-add-customer",
  templateUrl: "./new-customer.component.html",
  styleUrls: ["./new-customer.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class NewCustomerComponent implements OnInit, OnDestroy, SaveComponentCanDeactivate{
  public config: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right"
  });
  //gmap
  title: string = "";
  lat: number = 37.431489;
  lng: number = -122.163719;
  zoom: number = 11;
  //form
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
    name: ""
  };
  flag: any;
  customerId: any;
  phoneError:boolean=false;
  zipCodeError:boolean = false;
  customerFrom: FormGroup;
  showBackButton:boolean = false;
  states:any[] = [];
  editCustomer:boolean = false;
  formEdited:boolean = true;
  customerHeading:string = "New Customer";

  constructor(
    public colors: ColorsService,
    public http: Http,
    private router: Router,
    private userInfo: UserService,
    private mdToast: ToasterService,
    public apiProvider: ApiProvider,
    fb: FormBuilder,
    private route:ActivatedRoute
  ) {
    //this.getCustomer('true', 'false');
    //this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
    // this.role = this.userdata['permissions']['role'];
    this.customerFrom = fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      contactName: [null, Validators.required]
    });
  }
  // @HostListener("window:beforeunload")  
  SamplecanDeactivate(): Observable<boolean> | boolean {  
      return (  
          this.formEdited 
      );  
  } 
  ngOnInit() {
    this.states = usStates;
    this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
    this.apiProvider.singleSharedCustomer.subscribe((customer:any) => {
      if(customer){
        this.editCustomer = true;
        // console.log(customer);
        if(this.userdata.__t == 'Company'){
          if(this.userdata._id != customer.company){
            this.toast("Couldn't edit this customer", 'failed');
            this.router.navigate(['customer']);
          } 
        } 
        if(this.userdata.__t == 'Employee'){
          if(this.userdata.company != customer.company){
            this.router.navigate(['customer']);
            this.toast("Couldn't edit this customer", 'failed');
          } 
        }
        this.customerHeading = 'Edit Customer';
        this.name = customer.info.name;
        this.email = customer.info.email;
        this.contactName = customer.contact.name;
        this.phone = customer.contact.phone;
        this.state = customer.address.state;
        this.street = customer.address.street;
        this.city = customer.address.city;
        this.zipCode = customer.address.zipCode;
        // this.showBackButton = true;
        this.customerId = customer._id;
        this.updateGoogleMap(this.street, this.city);
      }
    });
  }

  onCancelCustomer(){
    this.router.navigate(['/customer']);
  }

  addCustomerToServer() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData("token"));
    let params = {
      email: this.email,
      name: this.contactName,
      contactName: this.name,
      phone: this.phone,
      city: this.city,
      state: this.state,
      street: this.street,
      zipCode: this.zipCode
    };
    if(!this.editCustomer){
      this.apiProvider.createCustomer(params).subscribe(response => {
        if (response["status"] == "1") {
          this.toast(response["message"], "success");
          //this.getCustomer("true", "false");
          this.email = "";
          this.name = "";
          this.contactName = "";
          this.phone = "";
          this.city = "";
          this.state = "";
          this.street = "";
          this.zipCode = "";
          this.formEdited = true;
          this.router.navigate(['customer']);
        } else {
          this.toast(response["message"], "danger");
        }
      });
    } else{
      params['customerId'] = this.customerId;
      this.apiProvider.updateCustomer(params).subscribe(response => {
        if(response["status"] == '1'){
          this.toast(response["message"], "success");
          //this.getCustomer("true", "false");
          this.email = "";
          this.name = "";
          this.contactName = "";
          this.phone = "";
          this.city = "";
          this.state = "";
          this.street = "";
          this.zipCode = "";
          this.formEdited = true;
          this.router.navigate(['customer']);
        } else {
          this.toast(response["message"], "danger");
        }
      })
    }
    
  }

  onConfirmCustomer() {

    this.addCustomerToServer();
  }

  checkPhone(){
    if(this.phone){
      this.formEdited = false;
      if(this.phone.match(/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/) || (this.phone.length == 10 && !isNaN(this.phone))){
        this.phoneError = false;
      } else{
        this.phoneError = true;
      }
    } else{
      this.phoneError = false;
    }
    
  }

  checkZipCode(){
    if(this.zipCode){
      this.formEdited = false;
      if(!this.zipCode.match(/[0-9]{5}/)){
        this.zipCodeError = true;
      } else{
        this.zipCodeError = false;
      }
    } else{
      this.zipCodeError = false;
    }
    
  }

  formIsEdit(){
    this.formEdited = false;
  }

  public toast(text, type) {
    var toast: Toast = {
      type: type,
      title: text,
      showCloseButton: true
    };
    this.mdToast.pop(toast);
  }

  //gmap
  markers: Marker[] = [
    {
      lat: 37.431489,
      lng: -122.163719,
      label: "S",
      draggable: false,
      title: "Stanford"
    }
  ];

  updateGoogleMap(street, city){
    if(this.street && this.city){
      let streetA = this.street.split(" ");
      let cityA = this.city.split(" ");
      let add = [...streetA, ...cityA];
      let Address;
      add.map((a, i) => {
        if(i == 0){
          Address = a;
        } else{
          Address = `${Address}+${a}`;
        }
      });
      this.apiProvider.decodingAddress(Address).subscribe((data:any) => {
        console.log(data);
        if(data.status="OK"){
          this.lat = data.results[0].geometry.location.lat;
          this.lng = data.results[0].geometry.location.lng;
          this.markers[0].lat = this.lat;
          this.markers[0].lng = this.lng;
          this.markers[0].label = '';
          this.markers[0].title = data.results[0].formatted_address;
        }
      })
    }
  }

  onSearchState(event){
    if(event.items.length == 1){
      this.state = event.items[0].name;
    } else{
      this.state = '';
    }
  }

  onSubmit(){
    
  }

  ngOnDestroy(){
    this.apiProvider.updateSingleSharedCustomer(null);
  }
}

// just an interface for type safety. gmap
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  title: string;
}
