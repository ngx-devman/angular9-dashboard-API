import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../shared/storage/storage.service';
import { ApiProvider } from '../../service/api';
import { UserService } from '../../shared/users/user.service';
import { ToasterService, Toast ,ToasterConfig} from 'angular2-toaster/angular2-toaster';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  
  @ViewChild('subscriptionDlg',{static:false}) subscriptionDlg: ModalComponent;
  
  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
});

  noadmins:any = "";
  nomanagers:any = "";
  notechnicians:any = "";
  groupList = "";

  constructor(private storage: StorageService, public apiProvider: ApiProvider, public userInfo: UserService,  private mdToast: ToasterService, ) {
    console.log("Subscription")
  }

  ngOnInit() {
    
  }

  getSubscriptions(){

    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        // let param = new FormData();
        // param.append('', );
        let param = { "noOfOfficeAdmins": this.noadmins, "noOfManagers": this.nomanagers, "noOfTechnicians": this.notechnicians}
        this.apiProvider.buySubscription(param).subscribe(data => {
console.log("response",data)
              if(data["status"] == 0){
                this.toast(data["message"], "failed");
              }else{
                this.toast(data["message"], "success");
                this.noadmins = "";
                this.nomanagers = "";
                this.notechnicians = "";
              }
              
        });
        this.subscriptionDlg.close();

  }
  onCreateSubscription(){
    this.subscriptionDlg.open();
  }
  public toast(text, type) {
    var toast: Toast = {
      type: type,
      title: text,
      showCloseButton: true
    };
    this.mdToast.pop(toast);
  }
  onCancelsubscription(){
    this.subscriptionDlg.close();
  }

}
