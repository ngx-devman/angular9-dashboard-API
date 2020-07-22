import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Location } from '@angular/common';
import { ApiProvider } from '../../../service/api';
import { publishable_key, secret_key } from '../../../../Stripe_config'
@Component({
  selector: 'app-buytag',
  templateUrl: './buytag.component.html',
  styleUrls: ['./buytag.component.scss']
})
export class BuyTagComponent {
  @ViewChild('buyDlg',{static:false}) buyDlg: ModalComponent;

  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
  });
  public tagList: Array<any> = [];
  Name = "";
  addressForPayment = "";
  cityForPayment = "";
  stateForPayment = "";
  zipForPayment = "";
  curTagCnt = 0;
  buyTagCnt = 0;
  tax: any;
  isAdmin = 0;
  cardId: any;
  stripeObj: any;
  cardData: any;
  card_id: any;
  sales: any;
  tagData: any;
  name: any;
  total:any;
  isRole:any;
  userdata:any;
  constructor(
    public colors: ColorsService,
    public http: Http,
    private router: Router,
    public apiProvider: ApiProvider,
    public userinfo: UserService,
    private mdToast: ToasterService,
    private location: Location
  ) {
    this.userdata = JSON.parse(this.userinfo.getUserData('userInfo'));
    this.isRole = this.userdata['permissions']['role'];
    this.getTags();
    this.getCompanyCards();
  }
  

  ngOnInit() {
    this.buyTagCnt = 0;
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
  getTags() {
    this.apiProvider.apitoken = JSON.parse(this.userinfo.getUserData('token'))
    this.apiProvider.getTags().subscribe(response => {
      console.log("cardtagss", response)
      if (response['status'] == "1") {
        this.tagData = response['orders'];
      }
    })
  }
  onBuyTag() {
    this.buyDlg.open();
  }

  onConfirmBuy() {
    this.addTags()
  }
  addCard(event: any) {

  }
  selectCard(name) {
    console.log("card ", name);
    var id = this.cardData.find(x => x.ending == name);
    this.card_id = id._id;
    console.log("card iIDdddddd", id._id);
   
    }
  setSales() {
    this.sales = (this.buyTagCnt * 5).toFixed(2);
    console.log("slas",this.sales)
    this.tax = (this.buyTagCnt * 5 * 0.0825).toFixed(2);
    console.log("tax",this.tax)
    this.total = (parseFloat( this.sales)  + parseFloat(this.tax )).toFixed(2)
    
    console.log("total",this.total)
  }

  addTags() {
    var stripe = window['Stripe'](publishable_key);
    this.stripeObj = stripe;
    var promise = this.stripeObj.createToken(this.card_id);
    promise.then((result) => {
        if (result.error) {
            this.mdToast.pop('Failed', result.error.message);
            return false;
        }
        console.log("stripe result", result)
          });
    this.apiProvider.apitoken = JSON.parse(this.userinfo.getUserData('token'));

    let param = {
      noOfTags: this.buyTagCnt,
      total: this.total,
      tax: this.tax,
      cardId: this.card_id,
      street: this.addressForPayment,
      city: this.cityForPayment,
      state: this.stateForPayment,
      zipCode: this.zipForPayment,
    }
    console.log("param", param)
    this.apiProvider.placeOrder(param).subscribe(response => {
      console.log("cardsss", response)
      if (response['status'] == "1") {
        this.toast(response['message'], "success");
        this.getTags();
      }else{
        this.toast(response['message'], "failed");
      }
      this.buyDlg.close();
    })

}
  onCancelBuy() {
    this.buyDlg.close();
  }

  public toast(text, type) {
    var toast: Toast = {
      type: type,
      title: text,
      showCloseButton: true
    };
    this.mdToast.pop(toast);
  }

  goToInvoice(item) {
    console.log(item)
    this.router.navigate(['/main/taginvoice'],{queryParams:{"tagInfo":JSON.stringify(item)}});
  }
}