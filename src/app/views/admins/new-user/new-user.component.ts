import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { UserService } from '../../../shared/users/user.service';
import { StorageService } from '../../../shared/storage/storage.service';
import { ApiProvider } from '../../../service/api';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  @ViewChild('groupDlg',{static:false}) groupDlg: ModalComponent;
  @ViewChild('addDlg',{static:false}) addDlg: ModalComponent;

  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
  });
  techlist = [
    { No: 1, techName: "tester" },
    { No: 2, techName: "test" },
    { No: 3, techName: "tested" }
  ]
  Group: any;
  // new api
  email: '';
  password: '';
  firstName: '';
  lastName: '';
  phone: '';
  managerData: '';
  managerFrom: FormGroup;
  technicianData: any;
  officeadminData: any;
  Users = [
    { id: "0", name: "Technician" },
    { id: "1", name: "Manager" },
    { id: "2", name: "Office/Dispatch" },
    { id: "3", name: "Administrator" }
  ]

  user_id: any;
  id: any;
  selectedItem: any;
  error: string = '*';
  btnSelect: string = 'Selected';

  group_Id: any;
  groupData: any;
  title: any;
  isEditable = false;
  linear = true;

  constructor(private router: Router, private userInfo: UserService, private storage: StorageService, public apiProvider: ApiProvider, private mdToast: ToasterService, fb: FormBuilder, ) {

    this.managerFrom = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'password': [null, Validators.required],
      'phone': [null, Validators.required],
    });
    this.getGroups()
  }

  setStyles() {
    let styles = {
      'color': this.error ? 'red' : 'black',
    };
    return styles;
  }
  Next() {
    this.linear = false;
  }
  ngOnInit() {
  }
  // selectUser(name){
  //   console.log(name)
  //   var Name=this.Users.find(x => x.name == name)
  //   console.log("Name",Name)
  //   this.user_id =Name.id
  //   console.log("user_id",this.user_id)
  //   }
  onClick(item) {
    this.selectedItem = item;
    this.user_id = item.id;
    console.log("userId", this.user_id)
  }

  getGroups() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
    this.apiProvider.getGroups().subscribe(response => {
      console.log("Get Group  Response", response);
      if (response['status'] == 1) {
        this.groupData = response['groups'];
      }
    })
  }
  onConfirmUser() {
    this.addDlg.open();
  }

  onAddUser() {
    if (this.user_id == "0") {
      this.btnSelect = 'selected'
      this.onConfirmTechnician();

    } else if (this.user_id == "1") {
      this.btnSelect = 'selected'
      this.onConfirmManager();
    } else {
      this.btnSelect = 'selected'
      this.onConfirmOfficeAdmin();
    }
  }
  onCancelUser() {
    this.addDlg.close();
  }
  addGroup(event: any) {
    // this.groupDlg.open();
  }
  addgroup() {
    this.groupDlg.open();
  }
  selectGroup(name) {
    console.log("employee bnameeee", name);
    var id = this.groupData.find(x => x.title == name);
    this.group_Id = id._id;
    console.log("group iIDdddddd", this.group_Id);
  }
  onConfirmAdd() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
    let param = {
      title: this.title
    }
    this.apiProvider.createGroup(param).subscribe(response => {
      console.log("Group  Response", response);
      if (response['status'] == 1) {
        this.toast(response['message'], "success");
        this.router.navigate(['/group']);
        this.getGroups();
      } else {
        this.toast(response['message'], "Failed");
      }
    })
    this.groupDlg.close();
  }
  onCancelAdd() {
    this.groupDlg.close();
  }
  getManager() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getManager().subscribe(response => {
      if (response['status'] == '1') {
        this.managerData = response['users'];
      }

    })
  }
  getTechnician() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getTechnician().subscribe(response => {
      if (response['status'] == '1') {
        this.technicianData = response['users'];
      }
    })
  }
  getOfficeAdmin() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getOfficeAdmin().subscribe(response => {
      if (response['status'] == '1') {
        this.officeadminData = response['users'];
      }
    })
  }
  onConfirmManager() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
    let params = {
      email: this.email,
      //password: 123456,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone
    }
    this.apiProvider.createManager(params).subscribe(response => {
      console.log("manager data", response)
      this.addDlg.close();
      if (response['status'] == '1') {
        this.formInitialize();
        this.toast(response['message'], "success");
        this.router.navigate(['/manager']);
        this.getManager();
      }
      else {
        this.toast(response['message'], "failed");
      }
    })
  }
  onConfirmTechnician() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    let params = {
      email: this.email,
      //password: 12345,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone
    }
    console.log(params);
    this.apiProvider.createTechnician(params).subscribe(response => {
      console.log("technnician data", response)
      this.addDlg.close();
      if (response['status'] == '1') {
        this.formInitialize();
        this.toast(response['message'], "success");
        this.router.navigate(['/tech']);
        this.getTechnician();
      } else {
        this.toast(response['message'], "failed");
      }
    })
  }
  onConfirmOfficeAdmin() {
    //new api
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    let param = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone
    }

    this.apiProvider.createOfficeAdmin(param).subscribe(response => {
      console.log("admin data", response)
      this.addDlg.close();
      if (response['status'] == '1') {
        this.formInitialize();
        this.toast(response['message'], "success");
        this.router.navigate(['/officeadmin']);
        this.getOfficeAdmin();
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

  formInitialize() {
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.phone = '';
  }
}
