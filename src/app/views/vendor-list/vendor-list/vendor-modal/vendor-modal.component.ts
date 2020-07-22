import { Component, OnInit, Inject } from '@angular/core';
import { ToasterService, Toast} from 'angular2-toaster';
import { ApiProvider } from '../../../../service/api';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-vendor-modal',
  templateUrl: './vendor-modal.component.html',
  styleUrls: ['./vendor-modal.component.scss']
})
export class VendorModalComponent implements OnInit {

  constructor(
        @Inject(MAT_DIALOG_DATA) public userData,
        private mdToast: ToasterService,
        public apiProvider: ApiProvider,
        public dialog:MatDialogRef<VendorModalComponent>
  ) { }
  newVendor:any = '';
  userExsist:boolean = true;
  searchedUser;

  ngOnInit() {
  }

  searchVendors(){
    this.userExsist = true;
    this.searchedUser = null;
    let params = {
      email: this.newVendor
    }
    this.apiProvider.searchVendor(params).subscribe((result:any) => {
      console.log(result);
      if(result.contractors.length == 0){
        this.userExsist = false;
      } else{
        let phone = result.contractors[0].contact.phone;
        let formatPhone = phone.match(/\d+/g).map(Number);
        let pho="";
        if(formatPhone.length > 1){
          formatPhone.map(p => {
            pho = `${pho}${p}`;
          });
        } else{
          pho = formatPhone[0];
        }
        result.contractors[0].contact.phone = pho.toString();
        this.searchedUser = result.contractors[0];
        this.userExsist = true;
      }
    })
  }

  inviteVendor(){
    let params = {
      email: this.newVendor
    }
    this.apiProvider.inviteVendor(params).subscribe((result:any) => {
      if(result.status == 0){
        this.mdToast.pop('success', '', result.message);
      } else{
        this.mdToast.pop('failed', '', result.message);
      }
      this.dialog.close();
    });
  }

  startContract(){
    let params = {
      contractorId: this.searchedUser._id
    }
    this.apiProvider.startContract(params).subscribe((result:any) => {
      if(result.status == 1){
        this.mdToast.pop('success', '', 'Vendor Added');
        this.dialog.close();
      } else{
        this.mdToast.pop('failed', '', result.message);
        this.dialog.close();
      }
    });
  }

  close(){
    this.dialog.close();
  }
}
