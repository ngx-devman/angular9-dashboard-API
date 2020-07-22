import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiProvider } from '../../service/api';
@Component({
  selector: 'app-buytag',
  templateUrl: './buytag.component.html',
  styleUrls: ['./buytag.component.scss']
})
export class BuyTagComponent {
  @ViewChild('buyDlg', { static: false }) buyDlg;

  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
  });
  public tagList: Array<any> = [];
  public listTitle: string;
  public curTagCnt = 0;
  public tagData: any;

  constructor(
    public colors: ColorsService,
    public http: Http,
    private router: Router,
    public apiProvider: ApiProvider,
    public userinfo: UserService,
    private mdToast: ToasterService,
    private location: Location
  ) {
    this.getTags();
  }

  ngOnInit() {
    // this implementation needs to be change when the data is correctly used
    const taglistLength = this.tagList.length || 0;
    this.listTitle = `${taglistLength} Purchases`
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
    this.buyDlg.onBuyTag();
  }

  FromBuyTagModal(response) {
    if (response['status'] == "1") {
      this.toast(response['message'], "success");
      this.getTags();
      return;
    }

    this.toast('Something went wrong', "error")
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