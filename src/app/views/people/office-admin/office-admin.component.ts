import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';;
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { CustomValidators } from 'ng2-validation';
import { ApiProvider } from '../../../service/api';
// import { ApiProvider } from '../../service/api';
@Component({
  selector: 'app-office-admin',
  templateUrl: './office-admin.component.html',
  styleUrls: ['./office-admin.component.scss']
})
export class OfficeAdminComponent implements OnInit {
  @ViewChild('addDlg',{static:false}) addDlg: ModalComponent;
  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
  });
  public officeadmin: any = {
    FirstName: '',
    LastName: '',
    Email: '',
  };
  officeadminInfo: any = {};
  email: '';
  password: '';
  firstName: '';
  lastName: '';
  phone: '';
  officeadminData: any;
  userdata: any;
  role: any;
  officeadminList: any;
  constructor(public colors: ColorsService,
    public http: Http,
    private userInfo: UserService,
    private mdToast: ToasterService,
    fb: FormBuilder,
    public apiProvider: ApiProvider
  ) {
    this.getOfficeAdmin();
    this.officeadminForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'password': [null, Validators.required],
      'phone': [null, Validators.required],
    });
    this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
    this.role = this.userdata['permissions']['role'];
    this.isAdmin = this.userInfo.getUserInfo('type');
  }
  isAdmin = 0;
  adminLastName: any;
  adminFirstName: any;
  adminemail: any;
  officeadminForm: FormGroup;
  adminList: any;
  searchOpt: any = {
    title: '',
  };
  ngOnInit() {
  }

  //new api
  getOfficeAdmin() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getOfficeAdmin().subscribe(response => {
      if (response['status'] == '1') {
        this.officeadminData = response['users'];
        this.officeadminList = this.officeadminData;
      }
    })
  }

  onCreateOfficeAdmin() {
    this.officeadminInfo.FirstName = "";
    this.officeadminInfo.LastName = "";
    this.officeadminInfo.Email = "";
    this.addDlg.open();

  }
  onCancelOfficeAdmin() {
    this.addDlg.close();
  }
  onConfirmOfficeAdmin() {
    //new api
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    let param = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone
    }

    this.apiProvider.createOfficeAdmin(param).subscribe(response => {
      if (response['status'] == '1') {
        this.toast(response['message'], "success");
        this.getOfficeAdmin();
      } else {
        this.toast(response['message'], "failed");
      }
    })
    this.addDlg.close();
  }

  checkValidation() {
    for (let controller in this.officeadminForm.controls) {
      this.officeadminForm.get(controller).markAsTouched();
    }
    if (this.officeadminForm.invalid) {
      return false;
    }
    else {
      //this.onSignUpNow();
      this.onConfirmOfficeAdmin();
    }
  }
  public toast(text, type) {
    var toast: Toast = {
      type: type,
      title: text,
      showCloseButton: true
    };
    this.mdToast.pop(toast);
  }
  filterSearch() {
    let list = [];
    this.officeadminData.map(item => {
      if (this.searchOpt.title.length > 0 && item.profile.displayName.toLowerCase().indexOf(this.searchOpt.title.toLowerCase()) == -1) {
        return;
      }
      list.push(item);
    });
    return list;
  }
  onChangeSearchValue(title, value) {
    if (value) {
      this.searchOpt[title] = value;
    }
    console.log("SEARCH OPT", this.searchOpt);
    // Do Search function..
    this.officeadminList = this.filterSearch();
  }
  onDelete(item){
    console.log("item",item)
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
    let params = {
        employeeId :item._id
    }
    this.apiProvider.deleteEmployee(params).subscribe(response =>{
        console.log("delete",response)
        if(response['status'] == '1')
        {
            this.toast(response['message'], "success");
            this.getOfficeAdmin();
        }
    })
}
}
