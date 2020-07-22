import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "ng2-validation";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../shared/users/user.service";
import { StorageService } from "../../shared/storage/storage.service";
import {
  ToasterService,
  ToasterConfig,
  Toast
} from "angular2-toaster/angular2-toaster";
import "rxjs/add/operator/map";
import { ApiProvider } from "../../service/api";
import { ModalDirective } from "ngx-bootstrap/modal";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { publishable_key, secret_key } from "../../../Stripe_config";

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SocialSignModalComponent } from './social-sign-modal/social-sign-modal.component';
import { AlertService } from '../../service/alert.service';
import { TermsModalComponent } from './terms-modal/terms-modal.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  auth2: any;
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  errText: String = "";
  param: any;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig = new ToasterConfig({
    // positionClass: 'toast-middle',
    positionClass: "toast-top-full-width",

    // tapToDismiss: true,
    timeout: 50000
  });

  subscribe = 0;
  y: any = {};
  @ViewChild("termsModal", {static: false}) termsModal : TermsModalComponent;
  // @ViewChild("termDlg",{static:false}) termDlg: ModalDirective;
  @ViewChild('socialSignupModal', {static: false}) socialSignupModal: SocialSignModalComponent;

  valForm1: FormGroup;
  valForm: FormGroup;
  showLoadingSpinner = false;
  stripeObj: any;
  card: any;
  firstName = "";
  lastName = "";
  companyName = "";
  companyEmail = '';
  industry = 1;
  email = "";
  password = "";
  phoneNumber = "";
  companyPhoneNumber = "";
  addressForPayment = "";
  cityForPayment = "";
  stateForPayment = "";
  zipForPayment = "";
  nameOnCard = "";
  verifyType = "";
  customerId = "";
  paymentType = -1;
  userType = "";
  paidAccount = 0;
  termAgreed = 0;
  agreeBtTitle = "Agree with terms of use and privacy";
  phoneMask = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
  from = "";
  street = "";
  city = "";
  state = "";
  zipCode = "";
  industryData: any;
  industryId: "";
  hide;
  constructor(
    fb: FormBuilder,
    private userInfo: UserService,
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    toasterService: ToasterService,
    public apiProvider: ApiProvider,
    public dialog: MatDialog,
    private authService: AuthService,
    public alertService: AlertService,
    private spinner: NgxSpinnerService
  ) {
    this.toasterService = toasterService;
    this.valForm1 = fb.group({
      email: [
        null,
        Validators.compose([Validators.required, CustomValidators.email])
      ],
      password: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      "verified method": [],
      phoneNumber: [null, Validators.required],
      // companyPhoneNumber: [null, Validators.required],
      industry: ['', Validators.required],
      companyName: [null, Validators.required],
      // companyEmail: [null, Validators.compose([Validators.required, CustomValidators.email])]
    });
    this.getIndustries();

    let token = userInfo.getUserInfo("token");
    let gymId = userInfo.getUserInfo("gym_id");
    this.subscribe = userInfo.getUserInfo("subscribe");
    if (token != "" && token != undefined) {
      let type = userInfo.getUserInfo("type");
      if (type == 0) {
        // this.router.navigate(['/main']);
        this.router.navigate(["/dashboard"]);
      } else {
        if (type == 1) {
          this.router.navigate(["/manufacture"]);
        } else if (type == 2) {
          alert(gymId);
          this.storage.setValue("SEL_GYM_ID", gymId);
          this.router.navigate(["/location"]);
        }
      }
    }
  }

  
  ngOnInit() {
    this.route.params.forEach(params => {
      this.param = params["param"];
    });

    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //   console.log('this is user facebook user data: ', this.user);
    // });
  }

  onGetAccess() {
    this.router.navigate(["/access"]).then(e => {
      if (e) {
      } else {
      }
    });
    //this.router.navigate(['/access']);
  }

  getOwners() {
    this.router.navigate(["/access"]);
  }

  getIndustries() {
    this.apiProvider.getIndustry().subscribe(response => {
      this.industryData = response["industries"];
    });
  }

  onAgreeTerm() {
    this.dialog.open(TermsModalComponent, {
      height: '90vh',
      width: '500px'
    });
  }

  AgreecheckboxChange(values: any) {
    if (values.currentTarget.checked) {
      this.termAgreed = 1;
    } else {
      this.termAgreed = 0;
    }
  }

  onAgree() {
    this.termAgreed = 1;
    this.agreeBtTitle = "You agreed with terms of use and privacy";
  }

  onCancelAgree() {}

  checkValidation() {
    for (let controller in this.valForm1.controls) {
      this.valForm1.get(controller).markAsTouched();
    }
    if (this.valForm1.invalid) {
      return false;
    } else {
      this.onSignUpNow();
    }
  }

  onSignUpNow() {
    this.paymentType = this.industry;
    if (this.paymentType == -1) {
      this.toasterService.pop("Failed", "Please select user type!");
    }
    if (
      this.email == "" ||
      this.firstName == "" ||
      this.lastName == "" ||
      this.password == "" ||
      this.phoneNumber == "" ||
      this.companyName == "" 
      // this.companyEmail == "" ||
      // this.companyPhoneNumber == ""
    ) {
      // this.toasterService.pop(
      //   "Failed",
      //   "Please input your missing information"
      // );
      this.alertService.error("Please input your missing information")
      console.log('this is form value: ', this.valForm1.valid);
      return false;
    }
    if (!this.termAgreed) {
      this.toasterService.pop(
        "Failed",
        "Please agree with terms of use and privacy"
      );
      return false;
    }
    // var stripe = window['Stripe']('pk_live_MPLi1v7ycIIsC32QQukmtj9T');
    var stripe = window["Stripe"](publishable_key);
    this.stripeObj = stripe;
    var elements = stripe.elements();

    var card = elements.create("card", {
      iconStyle: "solid",
      style: {
        base: {
          iconColor: "#8898AA",
          color: "black",
          lineHeight: "36px",
          fontWeight: 300,
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: "19px",
          "::placeholder": {
            color: "#8898AA"
          }
        },
        invalid: {
          iconColor: "#e85746",
          color: "#e85746"
        }
      },
      classes: {
        focus: "is-focused",
        empty: "is-empty"
      }
    });
    this.card = card;
    card.mount("#card-element");
    var inputs = document.querySelectorAll("input.field");
    Array.prototype.forEach.call(inputs, function(input) {
      input.addEventListener("focus", function() {
        input.classList.add("is-focused");
      });
      input.addEventListener("blur", function() {
        input.classList.remove("is-focused");
      });
      input.addEventListener("keyup", function() {
        if (input.value.length === 0) {
          input.classList.add("is-empty");
        } else {
          input.classList.remove("is-empty");
        }
      });
    });

    function setOutcome(result) {
      var successElement = document.querySelector(".success");
      var errorElement = document.querySelector(".error");
      successElement.classList.remove("visible");
      errorElement.classList.remove("visible");
      if (result.token) {
        successElement.querySelector(".token").textContent = result.token.id;
        successElement.classList.add("visible");
      } else if (result.error) {
        errorElement.textContent = result.error.message;
        errorElement.classList.add("visible");
      }
    }
    card.addEventListener("change", function(event) {
      setOutcome(event);
    });
    document.querySelector("form").addEventListener("submit", function(e) {
      e.preventDefault();
      var form = document.querySelector("form");
      var extraDetails = {
        name: form.querySelector("input[name=cardholder-name]").innerHTML
      };
      stripe.createToken(card, extraDetails).then(setOutcome);
    });
    // this.termsModal.onAgreeTerm();
    this.onAgreeTerm();
  }
  onFreeTrial() {
    this.from = "trial";
    this.paymentType = this.industry;
    if (this.paymentType == -1) {
      this.toasterService.pop("Failed", "Please select user type!");
      return false;
    }
    if (
      this.email == "" ||
      this.firstName == "" ||
      this.lastName == "" ||
      this.password == "" ||
      this.phoneNumber == "" ||
      this.companyName == "" 
      // this.companyEmail == "" ||
      // this.companyPhoneNumber == ""
    ) {
      // this.toasterService.pop(
      //   "Failed",
      //   "Please input your missing information"
      // );
      this.alertService.error("Please input your missing information");
      return false;
    }
    if (!this.termAgreed) {
      // this.toasterService.pop(
      //   "Failed",
      //   "Please agree with terms of use and privacy"
      // );
      this.alertService.error("Please agree with terms of use and privacy")
      return false;
    }
    switch (this.paymentType) {
      case 4:
        this.userType = "HVAC";
        break;
      case 0:
        this.userType = "Commercial Services";
        break;
      case 1:
        this.userType = "Roofing";
        break;
      case 2:
        this.userType = "Construction";
        break;
      case 3:
        this.userType = "Restaurants";
        break;
    }
    this.paidAccount = 0;
    for (let controller in this.valForm1.controls) {
      this.valForm1.get(controller).markAsTouched();
    }
    if (this.valForm1.invalid) {
      return false;
    } else {
      this.registerAccount();
    }
  }

  onPay() {
    if (
      this.addressForPayment == "" ||
      this.cityForPayment == "" ||
      this.stateForPayment == "" ||
      this.zipForPayment == "" ||
      this.nameOnCard == ""
    ) {
      this.toasterService.pop("Failed", "Please input your information");
      return false;
    }
    var promise = this.stripeObj.createToken(this.card);
    promise.then(result => {
      if (result.error) {
        this.toasterService.pop("Failed", result.error.message);
        return false;
      }
      let params = {
        Email: this.email,
        CardToken: result.token.id,
        Street: this.addressForPayment,
        City: this.cityForPayment,
        State: this.stateForPayment,
        ZipCode: this.zipForPayment,
        NameOnCard: this.nameOnCard
      };
      console.log("stripe result", result);
      // this.showLoadingSpinner = true;
      // let url = EnvVariables.PAYMENT_SERVER_ADDR + EnvVariables.STRIPE_CUSTOMER;
      // this.http.post(url, params).subscribe(response => {
      //     this.u.code = response['code'];
      //     if (this.u.code == 201) {
      //         this.userInfo.setStripeAccountId(result.customerID);
      //         this.customerId = result.customerID;
      //         this.paidAccount = 1;
      //         this.registerAccount();
      //         this.toasterService.pop('success', 'Success Toaster', 'Your membership is purchased successfully');
      //     } else {
      //         if (this.u.code == 199 || result.code == 200) {
      //             this.toasterService.pop('success', 'Success Toaster', result.codeText);
      //             this.showLoadingSpinner = false;
      //             return;
      //         }
      //     }
      //     this.showLoadingSpinner = false;
      // }, error => {
      //     this.toasterService.pop('failed', 'Error on http request!');
      //     this.showLoadingSpinner = false;
      // });
    });
  }

  registerAccount() {
    let params = {
      email: this.valForm1.value.email,
      password: this.valForm1.value.password,
      firstName: this.valForm1.value.firstName,
      lastName: this.valForm1.value.lastName,
      industryId: this.valForm1.value.industry,
      phone: this.valForm1.value.phoneNumber,
      companyName: this.valForm1.value.companyName,
      companyEmail: this.valForm1.value.email,
      companyPhone: this.valForm1.value.phoneNumber
    };
    console.log('this is form value: ', this.valForm1.value, params);
    this.showLoadingSpinner = true;
    this.apiProvider.signUp(params).subscribe(response => {
      if (response["status"] == "1") {
        this.alertService.success("This account is registered successfully");
        //this.router.navigate(['/access']);
        this.userInfo.setUserdata("token", response["token"]);
        this.userInfo.setUserdata("userInfo", response["user"]);
        this.userInfo.setUserdata("company", response['company']);
        this.router.navigate(["/dashboard"]);
      }
      if (response["status"] == "0") {
        // this.toasterService.pop('Failed', 'This account is already registered');
        this.toast(response["message"], "success");
      }
    }),
      error => {
        this.toasterService.pop("Failed", "Error on http request!");
        this.showLoadingSpinner = false;
      };
  }
  public toast(text, type) {
    var toast: Toast = {
      type: type,
      title: text,
      showCloseButton: true
    };
    this.toasterService.pop(toast);
  }

  sweetalertDemo3() {
    Swal.fire({
      type: "success",
      title: "Account registered successfully. Please check your email."
    });
  }
  onCancelPaymentDialog() {}
  goToLogin() {
    this.router.navigate(["/login"]);
  }
  clearValues() {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.userType = "";
    this.phoneNumber = "";
  }
  onSelectTd(id) {
    this.paymentType = id;
  }
  // goToChat() {
  //   window.open("https://spark.adobe.com/page/s8YG8su4HdaYr/", "_blank");
  // }
  // getHelp() {
  //   window.open("http://dasolgroup.freshdesk.com/", "_blank");
  // }

  async signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(async (res) => {
        
        const userData = {
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          socialId: res.id,
          connectorType: 1,
          companyEmail: res.email
        }
        console.log('this is google login res: ', userData);
        this.socialLoginModal(userData);
      })
      .catch(err => console.log('google login err: ', err));
  }

  async signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log('this is facebook login res: ', res);
        const userData = {
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          socialId: res.id,
          connectorType: 0,
          companyEmail: res.email
        }
        this.socialLoginModal(userData);
      })
      .catch(err => {
        console.log('Facebook login err: ', err)
      });
  } 

  async signOut() {
    this.authService.signOut();
  }

  openDialog(userData): void {
    console.log('modal is opened');
    const dialogRef = this.dialog.open(SocialSignModalComponent, {
      data: { userData,
              industryData: this.industryData}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.userInfo.setUserdata("token", result.res["token"]);
        this.userInfo.setUserdata("userInfo", result.res["user"]);
        this.userInfo.setUserdata("company", result.res['company']);
        this.router.navigate(["/dashboard"]);
      }
      console.log('modal is closed: ', result);
    });
  }

  socialLoginModal(userData) {
    this.spinner.show();
    const checkUserData = {
      socialId: userData.socialId,
      connectorType: userData.connectorType }
    this.apiProvider.checkAndGet(checkUserData).subscribe((res: any) => {
      console.log('check social login: ', checkUserData, res)
      this.spinner.hide();
      if (res.status === 0) {
        this.openDialog(userData);
      } else {
        console.log('this user is already existed');
        this.alertService.warn('This user is already existed');
      }
    });
    
  }
}
