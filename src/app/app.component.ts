import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { UserService} from './shared/users/user.service';
import { StorageService } from './shared/storage/storage.service';
import { ColorsService } from '../app/shared/colors/colors.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiProvider } from './service/api';
import { DefaultModelComponent } from './shared/components/default-model/default-model.component';
// import {ngxZendeskWebwidgetModule, ngxZendeskWebwidgetConfig,ngxZendeskWebwidgetService} from 'ngx-zendesk-webwidget';

//import { ModalComponent } from './modal/modal.component';


@Component({
  // tslint:disable-next-line
  providers: [UserService,StorageService,ColorsService],
  selector: 'body',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  pendingContracts:any[] = [];
  constructor(
    private router: Router, 
    private user:UserService, 
    public apiProvider: ApiProvider,
    public dialog: MatDialog
  ) { 
  //   ngxZendeskWebwidgetService.identify({
  //     name: 'Tester',
  //     email: 'websitedesignanddeveloper@gmail.com'
  //    })
  //    ngxZendeskWebwidgetService.show();
  //    ngxZendeskWebwidgetService.setSettings({
  //     webWidget
  // : {
  //     color
  // : { theme: '#78a300' }
  //   }
  // })
    // ngxZendeskWebwidgetService.activate();
  }
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
//     var saveData =this.user.getUserData('userInfo')
//     var token =this.user.getUserData('token')
//     if (saveData ) {
//         // logged in so return true
//         return true;
//     }

//     // not logged in so redirect to login page with the return url
//     this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url }});
//     console.log("returnUrl: state.url",)
//     return false;
// }
  ngOnInit() {
   
    console.log("APP COMPONENT");

    var isStored = JSON.parse(this.user.getUserData('userInfo')); //this.user.getUserData('userInfo')
    console.log(isStored);
    if(isStored){
      this.router.navigate(['/admin']);
      this.user.updateLoggedUser(isStored);
    }

    this.user.loggedUser.subscribe((u:any) => {
      if(u){
        this.apiProvider.apitoken = JSON.parse(this.user.getUserData("token"));
        this.apiProvider.getContracts().subscribe((contracts:any) => {
          console.log(contracts);
          console.log(u);
          this.pendingContracts = [];
          if(contracts.status == 1){
            contracts.contracts.map(contract => {
              if(contract.status == 0 && contract.contractor._id == u.company){
                this.pendingContracts.push(contract);
              }
            });
            let dataValues = {
              title: 'Pending Contracts',
              status: 'contracts',
              newContract: '',
              acceptContract: false,
              rejectContract: false,
              cusHeight: false
            }
    
            let dataInputs = {
              pendingContracts: this.pendingContracts
            }
    
            let data = {
              dataInputs: dataInputs,
              dataValues: dataValues
            }
            console.log(this.pendingContracts);
            if(this.pendingContracts.length > 0){
              const dialogRef = this.dialog.open(DefaultModelComponent, {
                width: '474px',
                data: data,
                panelClass: 'defaultModel' 
              });

              dialogRef.afterClosed().subscribe((data:any) => {
                console.log(data);
                if(data.data.createNew){
                  if(data.data.dataValues.acceptContract){
                    this.acceptContract(data.data.dataValues.newContract);
                  } else{
                    this.rejectContract(data.data.dataValues.newContract);
                  }
                }
              });
            }
          }
        });
      }
    });


    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.loadHubspotLiveChatScript();
  }

  acceptContract(contract){
    let params = {
      contractId: contract._id,
      status: 'accept'
    }
    this.apiProvider.acceptRejectContract(params).subscribe((contract:any) => {
      console.log(contract);
    });
  }

  rejectContract(contract){
    let params = {
      contractId: contract._id,
      status: 'reject'
    }
    this.apiProvider.acceptRejectContract(params).subscribe((contract:any) => {
      console.log(contract);
    });
  }

  public loadHubspotLiveChatScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = '//js.hs-scripts.com/6868877.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

}
// export class ZendeskConfig extends ngxZendeskWebwidgetConfig {
//   accountUrl: 'app.blueclerk.zendesk.com';
//   beforePageLoad(zE) {
//     zE.setLocale('en');
//     zE.hide();
//   }
 
  
// }