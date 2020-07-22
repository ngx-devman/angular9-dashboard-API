import { Component, OnInit ,ViewChild} from '@angular/core';
import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { ApiProvider } from '../../service/api';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  @ViewChild('cancelDlg',{static:false}) cancelDlg: ModalComponent;
  Employeedata:any;
  employeeId:any;
  employee_ID:any;
  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
});
  constructor( public colors: ColorsService,
    public http: Http,
    private router: Router,
    private userInfo: UserService,
    private mdToast: ToasterService,
    public apiProvider: ApiProvider,) {
      this.getAllEmployee();
     }

  ngOnInit() {
  }

  getAllEmployee() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getAllEmployee().subscribe(response => {
        console.log("All employee", response['employees'])
        // if (response['status'] == '1') {
        this.Employeedata = response['employees']
        this.employeeId=this.Employeedata._id
      
    })
  }
  onDelete(item){
    console.log("item",item)
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    let param={
      employeeId:item._id
    }
    this.apiProvider.deleteEmployee(param).subscribe(response =>{
      console.log("delete employee", response)
      if (response['status'] == '1') {
        this.toast(response['message'], "success");
        this.getAllEmployee();
    }
    else{
        this.toast(response['message'], "failed");
    }
    })
  }
  activeDlg(item){
    this.cancelDlg.open();
    this.employee_ID =item._id
  }
  activeEmployee(){
    this.apiProvider.apitoken= JSON.parse(this.userInfo.getUserData('token'));
    let param = {
      employeeId:this.employee_ID
    }
    this.apiProvider.activeEmployee(param).subscribe(response =>{
      console.log("active employee",response);
      if(response["status"]=='1'){
        this.toast(response['message'], "success");
        this.cancelDlg.close();
      }
    })
  }
  dismissView(){
    this.cancelDlg.close();
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
