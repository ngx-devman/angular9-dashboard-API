import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { EnvVariables } from '../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Location } from '@angular/common';
declare var Stripe: any;

@Component({
  selector: 'app-purchased-tag',
  templateUrl: './purchased-tag.component.html',
  styleUrls: ['./purchased-tag.component.scss']
})
export class PurchasedTagComponent implements OnInit {
  @ViewChild('buyDlg',{static:false}) buyDlg: ModalComponent;

  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
  });

  public tagList: Array<any> = [];
  public listTitle: string;

  addressForPayment = "";
  cityForPayment = "";
  stateForPayment = "";
  zipForPayment = "";
  curTagCnt = 0;
  buyTagCnt = 0;
  isAdmin = 0;

  constructor(
    public colors: ColorsService,
    public http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private userInfo: UserService,
    private storage: StorageService,
    private mdToast: ToasterService,
    private location: Location
  ) {
    this.getPurchasedTags();
    this.isAdmin = this.userInfo.getUserInfo('type');
  }

  ngOnInit() {
    this.addressForPayment = this.userInfo.getUserInfo('card_street');
    this.cityForPayment = this.userInfo.getUserInfo('card_city');
    this.stateForPayment = this.userInfo.getUserInfo('card_state');
    this.zipForPayment = this.userInfo.getUserInfo('card_zip_code');
    this.buyTagCnt = 0;
  }

  getPurchasedTags() {
    this.curTagCnt = 0;
    let params = {
      UserId: this.userInfo.getUserInfo('id'),
      Token: this.userInfo.getUserInfo('token'),
    };

    let url = EnvVariables.SERVER_ADDR + EnvVariables.GET_PURCHAED_TAGS;
    this.http.post(url, params).subscribe(response => {
      let result = response.json();
      let list = result.Data;
      try {
        list.map((tag, idx) => {
          tag['No'] = idx + 1;
          tag['shippingAddress'] = tag['street'] + ', ' + tag['city'] + ', ' + tag['state'] + ', ' + tag['zipCode'];
          this.curTagCnt += parseInt(tag['tagCnt']);
        });
      } catch (error) { }
      
      this.tagList = list || [];
      const taglistLength = this.tagList.length || 0;
      this.listTitle = `${taglistLength} Purchases`
    }, error => {
      this.toast("Error on http request!", "failed");
    });
  }

  onBuyTag() {
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
    this.buyDlg.open();
  }

  onConfirmBuy() {
    var customerId = this.userInfo.getUserInfo('account_id');
    if (customerId == '') {
      this.toast("Please attach your card first!", "failed");
      return;
    }
    let params = {
      UserId: this.userInfo.getUserInfo('id'),
      Token: this.userInfo.getUserInfo('token'),
      Customer: customerId,
      TagCnt: this.buyTagCnt,
      TotalPrice: (this.buyTagCnt * 5 * 1.0825).toFixed(2),
      Description: 'Payment for tag purchase',
      Street: this.addressForPayment,
      City: this.cityForPayment,
      State: this.stateForPayment,
      ZipCode: this.zipForPayment,
    };

    let url = EnvVariables.PAYMENT_SERVER_ADDR + EnvVariables.STRIPE_TAG_CHARGE;
    this.http.post(url, params).subscribe(response => {
      let result = response.json();
      if (result.code == 201) {
        this.toast("Success on purchase tag!", "success");
        this.buyDlg.close();
        this.getPurchasedTags();
      } else {
        this.toast("Failed on purchase tag!", "failed");
      }
    }, error => {
      this.toast("Error on http request!", "failed");
    });
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
  goToInvoice() {
    this.router.navigate(['/main/taginvoice']);
  }
}