import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';


import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { EnvVariables } from '../../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ApiProvider } from '../../../service/api';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {
  @ViewChild('inventDlg',{static:false}) inventDlg: ModalComponent;
equipData:any;
  constructor(public colors: ColorsService,
    public http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private userInfo: UserService,
    private storage: StorageService,
    private mdToast: ToasterService,
    public apiProvider: ApiProvider) { 
      this.getCompanyEquipment();
    }

    getCompanyEquipment(){
      this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
      this.apiProvider.getCompanyEquipment().subscribe(response =>{
        console.log("company equ",response)
        if(response['status']=='1'){
          this.equipData =response['companyEquipments'];
          console.log("company equipments",  this.equipData)
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