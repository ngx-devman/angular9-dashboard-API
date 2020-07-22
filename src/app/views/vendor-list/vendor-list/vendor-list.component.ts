import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/users/user.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { ApiProvider } from '../../../service/api';
import { MatDialog } from '@angular/material';

import { VendorModalComponent } from './vendor-modal/vendor-modal.component';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {

  listTableHeads = ['No', 'Company Name', 'Status', 'View'];
  activityTableHeads = ['Photo', 'Name', 'Recent Activity', 'Action'];
  activityData = [1, 2, 3, 4];
  vendorList:any[] = [];
  role:number = 0;
  userdata;
  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
  });
  searchOpt: any = {
    name: '',
  };
  venderData;
  listTitle:string = 'Vendors List';
  constructor(
        public http: Http,
        private router: Router,
        private userInfo: UserService,
        private mdToast: ToasterService,
        public apiProvider: ApiProvider,
        public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getVendorList();
  }

  getVendorList(){
    this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
    this.role = this.userdata['permissions']['role'];
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getVendors().subscribe((response:any) => {
      if(response.status == 1){
        console.log(response);
        this.venderData = [...response.contracts];
        this.vendorList = response.contracts;
        this.listTitle = `Vendors List (${this.venderData.length})`;
      }
    });
  }

  onCreateVendor(){
    const dialogRef = this.dialog.open(VendorModalComponent, {
      width: '650px',
      data: this.userdata,
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.getVendorList();
    });
  }

  updateSearch(event){
    this.searchOpt = event;
    this.vendorList = this.filterSearch();
  }

  filterSearch() {
    let list = [];
    this.venderData.map(item => {
        if (this.searchOpt.name.length > 0 && item.contractor.info.companyName.toLowerCase().indexOf(this.searchOpt.name.toLowerCase()) == -1) {
            return;
        }
        list.push(item);
    });
    return list;
  }

}
