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
import { ApiProvider } from '../../service/api';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
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
  includeActive = true;
  // includeNonActive=true;
  customerdata: any;
  userdata: any;
  role: any;
  searchOpt: any = {
    name: '',
  };
  public custList: Array<any> = [];

  constructor(
    public colors: ColorsService,
    public http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private userInfo: UserService,
    private storage: StorageService,
    private mdToast: ToasterService,
    private location: Location,
    public apiProvider: ApiProvider) {
    this.getCustomer(true, false);
    this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
    this.role = this.userdata['permissions']['role'];
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
      } else {
        this.toast(response['message'], "failed");
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
  Equiplist(item) {
    let customer_id = item['_id'];
    this.router.navigate(['/equipment'], { queryParams: { "_id": customer_id }, skipLocationChange: true });
  }
  goBack() {
    this.location.back();
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

    // Do Search function..
    this.custList = this.filterSearch();
}
}