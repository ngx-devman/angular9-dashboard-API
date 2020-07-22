import { Component, ViewEncapsulation, ViewChild, ElementRef, NgZone } from "@angular/core";
import { Http } from "@angular/http";
import { ToasterService, Toast, ToasterConfig } from "angular2-toaster";
import { ColorsService } from "../../../shared/colors/colors.service";
import { UserService } from "../../../shared/users/user.service";
import { Router } from "@angular/router";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { ApiProvider } from "../../../service/api";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { consoleTestResultHandler } from 'tslint/lib/test';

var autocomplete
declare const google: any;

@Component({
  selector: "app-add-customer",
  templateUrl: "./new-customer.component.html",
  styleUrls: ["./new-customer.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class NewCustomerComponent {
  @ViewChild('search',{static:false})
  public searchElementRef: ElementRef;
  public config: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right"
  });



  //gmap
  title: string = "AGM project";
  latitude: number = 0;
  longitude: number = 0;
  zoom: number;
  private geoCoder;
  address: any = [];
  newAddress: any;
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

  customerFrom: FormGroup;
  lat: any;
  lng: any;
  postal_code:any;
  administrative_area_level_1:any;
  locality:any;
  street_number:any;
  sublocality_level_1:any;
  constructor(
    public colors: ColorsService,
    public http: Http,
    private router: Router,
    private userInfo: UserService,
    private mdToast: ToasterService,
    public apiProvider: ApiProvider,
    fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    //this.getCustomer('true', 'false');
    //this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
    // this.role = this.userdata['permissions']['role'];
    this.customerFrom = fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      name: [null, Validators.required]
    });
    this.getSearchAddress();
    this.setCurrentLocation();
  }




  addCustomerToServer() {
    this.postal_code = (<HTMLInputElement>document.getElementById('postal_code')).value;
    console.log("postal_code",this.postal_code);

    this.administrative_area_level_1 = (<HTMLInputElement>document.getElementById('administrative_area_level_1')).value;
    console.log("administrative_area_level_1",this.administrative_area_level_1);

    this.locality = (<HTMLInputElement>document.getElementById('locality')).value;
    console.log("locality",this.locality);

        this.sublocality_level_1 = (<HTMLInputElement>document.getElementById('sublocality_level_1')).value;
    console.log("sublocality_level_1",this.sublocality_level_1);
    
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData("token"));
    let params = {
      email: this.email,
      name: this.name,
      contactName: this.contactName,
      phone: this.phone,
      city: this.locality,//this.city,
      state:this.administrative_area_level_1,  //this.state,
      street:this.sublocality_level_1,//this.street,
      zipCode:this.postal_code // this.zipCode
    }
    console.log("param",params)
    this.apiProvider.createCustomer(params).subscribe(response => {
      if (response["status"] == "1") {
        this.toast(response["message"], "success");
        this.router.navigate(['/customer']);
      //this.getCustomer("true", "false");
        this.email = "";
        this.name = "";
        this.contactName = "";
        this.phone = "";
        this.city = "";
        this.state = "";
        this.street = "";
        this.zipCode = "";

      } else {
        this.toast(response["message"], "danger");
      }
    });
  }
  onConfirmCustomer() {
    this.addCustomerToServer();
    
  }
  public toast(text, type) {
    var toast: Toast = {
      type: type,
      title: text,
      showCloseButton: true
    };
    this.mdToast.pop(toast);
  }
  onCancelCustomer() {

  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  // fillInAddress() {
  //   var componentForm = {
  //     sublocality_level_1: 'short_name',
  //     locality: 'long_name',
  //     administrative_area_level_1: 'short_name',
  //     postal_code: 'short_name'
  //   };
  //   var place = autocomplete.getPlace();
  //   for (var component in componentForm) {
  //     (<HTMLInputElement>document.getElementById(component)).value = "";
  //     (<HTMLInputElement>document.getElementById(component)).disabled = false;
  //     var x = document.getElementById(component);
  //   }
  //   for (var i = 0; i < place.address_components.length; i++) {
  //     var addressType = place.address_components[i].types[0];
  //     console.log(componentForm[addressType])
  //     if (componentForm[addressType]) {
  //       var val = place.address_components[i][componentForm[addressType]];
  //       (<HTMLInputElement>document.getElementById(addressType)).value = val;
  //     }
  //   }
  // }

  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle(
          { center: geolocation, radius: position.coords.accuracy });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }
  getSearchAddress() {

    // this.mapsAPILoader.load().then(() => {
    //   this.setCurrentLocation();
    //   this.geoCoder = new google.maps.Geocoder;

    //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    //     // types: ["address"]
    //   });
    //   autocomplete.addListener("place_changed", () => {
    //     this.ngZone.run(() => {
    //       //get the place result
    //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();

    //       //verify result
    //       if (place.geometry === undefined || place.geometry === null) {
    //         return;
    //       }

    //       //set latitude, longitude and zoom
    //       this.latitude = place.geometry.location.lat();
    //       this.longitude = place.geometry.location.lng();
    //       this.zoom = 12;
    //     });
    //   });

    //  load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();

      autocomplete = new google.maps.places.Autocomplete(<HTMLInputElement>document.getElementById('autocomplete'), { types: ['geocode'] });
      autocomplete.setFields(['address_component']);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          var componentForm = {
            sublocality_level_1: 'short_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            postal_code: 'short_name'
          };
          var place = autocomplete.getPlace();
          for (var component in componentForm) {
            (<HTMLInputElement>document.getElementById(component)).value = "";
            (<HTMLInputElement>document.getElementById(component)).disabled = false;
            var x = document.getElementById(component);
          }

          for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            console.log(componentForm[addressType])
            if (componentForm[addressType]) {
              var val = place.address_components[i][componentForm[addressType]];
              (<HTMLInputElement>document.getElementById(addressType)).value = val;
            }
          }

          let addr = (<HTMLInputElement>document.getElementById('autocomplete')).value;

          fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addr}&key=AIzaSyCih6AZmiTGOe8N0lJXfIL7y8FXOXzJd7w`).then((res) => {
            return res.json()
          }).then(data => {
            console.log(data)
            // this.markers.push({
            //   lat: data.results[0].geometry.location.lat,//16.431489,
            //   lng: data.results[0].geometry.location.lng//74.163719
            // });
            this.lat = data.results[0].geometry.location.lat;
            this.lng = data.results[0].geometry.location.lng;
          })
        });
      });
    })
  }

  // this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //   console.log(this.address)
  //   var geocoder = new google.maps.Geocoder();
  // geocoder.geocode({ 'address': "kolhapur,maharashtra" }, (results, status) => {
  //   console.log(results);
  //   console.log(status);
  //   if (status === 'OK') {
  //     if (results[0]) {
  //       this.zoom = 12;
  //       this.newAddress = results[0].formatted_address;
  //       console.log("new address",this.newAddress)
  //     } else {
  //       window.alert('No results found');
  //     }
  //   } else {
  //     window.alert('Geocoder failed due to: ' + status);
  //   }

  // });

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    // this.getAddress(this.latitude, this.longitude);
  }

  //gmap
  public markers: Marker[] = [
    {
      lat: 0,
      lng: 0,
      // label: "S",
      // draggable: false,
      // title: "Stanford"
    }
  ];
}
// markers: Marker[] = [
//   {
//     lat:this.state,
//     lng: this.state,
//     label: "S",
//     draggable: false,
//     title:this.state
//   }
// ];
// }

// just an interface for type safety. gmap
interface Marker {
  lat: number;
  lng: number;
  // label?: string;
  // draggable: boolean;
  // title: string;
}

