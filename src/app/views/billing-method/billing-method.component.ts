import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { StorageService } from '../../shared/storage/storage.service';
import { ApiProvider } from '../../service/api';
import { UserService } from '../../shared/users/user.service';
import { ToasterService, Toast ,ToasterConfig} from 'angular2-toaster/angular2-toaster';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { publishable_key, secret_key } from '../../../Stripe_config'
@Component({
  selector: 'app-billing-method',
  templateUrl: './billing-method.component.html',
  styleUrls: ['./billing-method.component.scss']
})
export class BillingMethodComponent implements OnInit {
  @ViewChild('cardDlg',{static:false}) cardDlg: ModalDirective;
  @ViewChild('viewCard',{static:false}) viewCard: ModalComponent;
  @ViewChild('deleteDlg',{static:false}) deleteDlg: ModalComponent;
  
  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
});
  Viewname: any;
  Viewcardnumber: any;
  Viewbsvalue: any;
  Viewaddress: any;
  ViewCity: any;
  ViewState: any;
  ViewZipcode: any;
  Viewcvv: any;
  ViewCard: any;
  lastDigit: any;
  card: any;
  addressForPayment = "";
  cityForPayment = "";
  stateForPayment = "";
  zipForPayment = "";
  nameOnCard = "";
  stripeObj: any;
  token: any;
  ending: any;
  card_id:any;
  items = [
    { 'id': 1, 'name': 'Visa' },
    { 'id': 2, 'name': 'Mastercard' },
    { 'id': 3, 'name': 'Discover' },
    { 'id': 4, 'name': ' American Express' },
  ];
  public cardList: Array<any> = [];
  public mm: any;
  months = [
    { val: '01', name: 'Jan' },
    { val: '02', name: 'Feb' },
    { val: '03', name: 'Mar' },
    { val: '04', name: 'Apr' },
    { val: '05', name: 'May' },
    { val: '06', name: 'Jun' },
    { val: '07', name: 'Jul' },
    { val: '08', name: 'Aug' },
    { val: '09', name: 'Sep' },
    { val: '10', name: 'Oct' },
    { val: '11', name: 'Nov' },
    { val: '12', name: 'Dec' }
  ];


  public years: number[] = [];
  public yy: number;
  cardData: any;

  constructor(private storage: StorageService, public apiProvider: ApiProvider, public userinfo: UserService,  private mdToast: ToasterService, ) {
    this.getCompanyCards();
  }

  ngOnInit() {
    this.getMonth();
    this.getYear();
  }
  getMonth() {
    var today = new Date();
    this.mm = today.getMonth() + 1;
    if (this.mm < 10) {
      this.mm = '0' + this.mm
    }
  }
  getYear() {
    var today = new Date();
    this.yy = today.getFullYear();
    for (var i = this.yy; i <= this.yy + 100; i++) {
      this.years.push(i);
    }
  }

  onCreateCard() {
    this.onConfirmCard();
    // this.cardDlg.open();
    // this.cardInfo.cardname = "";
    // this.cardInfo.cardnumber = "";
    // this.cardInfo.address = "";
    // this.cardInfo.bsValue = "";
    // this.cardInfo.cvv = "";
    // this.cardInfo.city = "";
    // this.cardInfo.state = "";
    // this.cardInfo.zipcode = "";
    // this.cardInfo.card = "";

  }

  onConfirmCard() {
    // var stripe = window['Stripe']('pk_live_MPLi1v7ycIIsC32QQukmtj9T');
    var stripe = window['Stripe'](publishable_key);
    this.stripeObj = stripe;
    var elements = stripe.elements();

    var card = elements.create('card', {
      iconStyle: 'solid',
      style: {
        base: {
          iconColor: '#8898AA',
          color: 'black',
          lineHeight: '36px',
          fontWeight: 300,
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '19px',
          '::placeholder': {
            color: '#8898AA',
          },
        },
        invalid: {
          iconColor: '#e85746',
          color: '#e85746',
        }
      },
      classes: {
        focus: 'is-focused',
        empty: 'is-empty',
      },
    });
    this.card = card;
    card.mount('#card-element');
    var inputs = document.querySelectorAll('input.field');
    Array.prototype.forEach.call(inputs, function (input) {
      input.addEventListener('focus', function () {
        input.classList.add('is-focused');
      });
      input.addEventListener('blur', function () {
        input.classList.remove('is-focused');
      });
      input.addEventListener('keyup', function () {
        if (input.value.length === 0) {
          input.classList.add('is-empty');
        } else {
          input.classList.remove('is-empty');
        }
      });
    });

    function setOutcome(result) {
      var successElement = document.querySelector('.success');
      var errorElement = document.querySelector('.error');
      successElement.classList.remove('visible');
      errorElement.classList.remove('visible');
      if (result.token) {
        successElement.querySelector('.token').textContent = result.token.id;
        successElement.classList.add('visible');
      } else if (result.error) {
        errorElement.textContent = result.error.message;
        errorElement.classList.add('visible');
      }
    }
    card.addEventListener('change', function (event) {
      setOutcome(event);
    });
    document.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      var form = document.querySelector('form');
      var extraDetails = {
        name: form.querySelector('input[name=cardholder-name]').innerHTML,
      };
      stripe.createToken(card, extraDetails).then(setOutcome);
    });
    this.cardDlg.show();

  }

  onPay() {
    if (this.addressForPayment == "" || this.cityForPayment == "" || this.stateForPayment == "" || this.zipForPayment == "" || this.nameOnCard == "") {
      this.toast('Failed', 'Please input your information');
      return false;
    }
    var promise = this.stripeObj.createToken(this.card);
    promise.then((result) => {
      if (result.error) {
        this.toast('Failed', result.error.message);
        return false;
      }
      console.log("stripe result", result)
      // if(result=="token"){
      this.token = result.token.id;
      this.ending = result.token.card.last4;
      console.log("token idddd", this.token)
      console.log("ending", this.ending)
      this.addCompanyCard();
      // }
    });
  }
  // onConfirmCard() {
  //   this.cardDlg.close();
  //   this.list = {
  //     cardname: this.cardInfo.cardname, cardnumber: this.cardInfo.cardnumber, address: this.cardInfo.address, cvv: this.cardInfo.cvv, bsvalue: this.cardInfo.bsValue,
  //     city: this.cardInfo.city, state: this.cardInfo.state, zipcode: this.cardInfo.zipcode, card: this.cardInfo.card
  //   };
  //   this.cardList.push(this.list);
  //   this.storage.setValue("cardlist---", this.cardList)
  //   var number = this.cardInfo.cardnumber.toString();
  //   this.lastDigit = number.slice(0, 12).replace(/\d/g, 'x') + number.slice(-4);
  // // }
  // onCancelCard() {
  //   this.cardDlg.close();
  // }
  addCompanyCard() {
    this.apiProvider.apitoken = JSON.parse(this.userinfo.getUserData('token'));
    let param = {
      token: this.token,
      ending: this.ending
    }
    this.apiProvider.addCompanyCard(param).subscribe(response => {
      console.log("cardsss", response)
      if (response['status'] == '1') {
        this.toast(response['message'], "success");
      }
    })
  }
  viewcard(item) {
    this.viewCard.open();
    this.Viewname = item.cardname;
    this.Viewcardnumber = item.cardnumber;
    this.Viewbsvalue = item.bsvalue;
    this.Viewaddress = item.address;
    this.Viewcvv = item.cvv;
    this.ViewCity = item.city;
    this.ViewState = item.state;
    this.ViewZipcode = item.zipcode;
    this.ViewCard = item.card;
    var number = this.Viewcardnumber.toString();
    this.lastDigit = number.slice(0, 12).replace(/\d/g, 'x') + number.slice(-4);
  }
  onConfirmviewCard() {
    this.viewCard.close();
  }
  onCancelviewCard() {
    this.viewCard.close();
  }
  onDelete(item) {
    console.log("item",item)
    this.card_id = item._id
    this.apiProvider.apitoken = JSON.parse(this.userinfo.getUserData('token'));
    let param ={
      cardId: this.card_id
    }
    this.apiProvider.removeCard(param).subscribe(response =>{
      console.log("delete cards",response)
      if (response['status'] == '1') {
        this.toast(response['message'], "success");
      }else   if (response['status'] == '0'){
        this.toast(response['message'], "failed");
      }
       
    })
  }
  getCompanyCards() {
    this.apiProvider.apitoken = JSON.parse(this.userinfo.getUserData('token'))
    this.apiProvider.getCompanyCards().subscribe(response => {
      console.log("cards", response)
      if (response['status'] == "1") {
        this.cardData = response['cards'];
       
      }
    })
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
