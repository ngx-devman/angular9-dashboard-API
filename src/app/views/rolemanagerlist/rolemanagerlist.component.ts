import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { EnvVariables } from '../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { navItems, navTech , navItemsTechManager, navItemsGym, navItemsManufacture/*, navMainItems*/} from '../../_nav';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rolemanagerlist',
  templateUrl: './rolemanagerlist.component.html',
  styleUrls: ['./rolemanagerlist.component.scss']
})
export class RolemanagerlistComponent  {
  @ViewChild('addDlg',{static:false}) addDlg: ModalComponent;
  @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
  @ViewChild('confirmDeleteDlg',{static:false}) confirmDeleteDlg: ModalComponent;

  public userList: Array<any> = [];

  public items: any = [];
  public itemuser:any =[];
  public managerList: Array<any> = [];
  public techList:any=[];
  public navItems :any;
  public managername :any;
  searchOpt: any = {
    managername: '',
};

  public config : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
});

  constructor(
      public colors: ColorsService,
      public http: Http,
      private route: ActivatedRoute,
      private router: Router,
      private userInfo: UserService,
      private storage: StorageService,
      private mdToast: ToasterService,
      fb: FormBuilder,
      private location: Location
  ) {
        if(this.userInfo.getUserInfo('type')== 1)
        {
        this.navItems= navItemsTechManager;
        }
        else if(this.userInfo.getUserInfo('type') == 6)
        {
        this.navItems = navItemsManufacture;
        }
        else if(this.userInfo.getUserInfo('type') == 2 ||this.userInfo.getUserInfo('type') == 5)
        {
        this.navItems = navItemsGym;
        }
        else if(this.userInfo.getUserInfo('type') == 0){
        this.navItems = navTech;
        }else if(this.userInfo.getUserInfo('type') == -1){
        this.navItems = navTech;//navMainItems;
        }
        else{
        this.navItems = navItems;
        }  
        for(let i = 0; i<this.navItems.length; i++){
            if(!this.navItems[i].title)
            {  
                this.items.push(this.navItems[i]);
            }
        }
        this.refreshInfo();
    }
    refreshInfo() {
        let params = {
            UserId: this.userInfo.getUserInfo('id'),
            Token: this.userInfo.getUserInfo('token'),
            LastId: 0,
            Count: -1,
        };

        let url;
        url = EnvVariables.SERVER_ADDR + EnvVariables.MANAGER_LIST;
        this.http.post(url, params).subscribe(response => {
            let result = response.json();
            if(result.Success == true) {
                let list = result.Data;
                list.map((item, index) => {
                    list[index]['No'] = index + 1;
                    list[index]['name'] = item.firstName + ' ' + item.lastName;
                });
                this.userList = list;
                this.managerList = list;
            } else {
                this.toast("Failed on loading users!", "failed");
            }
        }, error => {
            this.toast("Error on http request!", "failed");
        });
    }
    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };
        this.mdToast.pop(toast);
    }
    onselectManager(id){
    }
    filterSearch() {
      let list = [];
      this.userList.map(item => {

          if(this.searchOpt.managername.length > 0 && item.name.toLowerCase().indexOf(this.searchOpt.managername.toLowerCase()) == -1) {
              return;
          }

          list.push(item);
      });

      return list;
    }
    onChangeSearchValue(managername, value) {
        if(value) {
            this.searchOpt[managername] = value;
        }
        // Do Search function..
        this.managerList = this.filterSearch();
    }
    addManager(event:any){
        this.managerList = this.filterSearch();
    }
}