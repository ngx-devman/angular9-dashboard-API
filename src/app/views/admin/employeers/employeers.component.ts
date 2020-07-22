import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { UserService } from '../../../shared/users/user.service';
import { EnvVariables } from '../../../service/env-variables';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-employeers',
  templateUrl: './employeers.component.html',
  styleUrls: ['./employeers.component.scss']
})
export class EmployeersComponent implements OnInit {

  employeerTypes = [
    {name: 'Add Manager', color: '#0483c3', type: 'addManager', click: 'addManager', i: "person"},
    {name: 'Add Technician', color: 'green', type: 'addTechnician', click: 'addTechnician', i: "person"}
  ]
  public userList: Array<any> = [];
  selTechManager: any = { "first_name": "" };
  public manager: any = {
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Email: '',
    Type: 1,
    list: [],
  };

  public tech: any = {
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    Email: '',
    Type: 1,
    list: [],
  };

  public techList: Array<any> = [];
  public technicianList: Array<any> = [];

  equipmentType: any = '';

  status = 1;
  @ViewChild('managerDlg',{static:false}) managerDlg: ModalComponent;
  @ViewChild('techDlg',{static:false}) techDlg: ModalComponent;

  managerFrom: FormGroup;
  techFrom: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private userInfo: UserService,
    public http: Http,
    private mdToast: ToasterService, 
  ) { }

  ngOnInit() {
    this.managerFrom = this.fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'phoneNumber': [null],
    });
    this.techFrom = this.fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'phoneNumber': [null],
  });
  }

  goemployeerType(type: string) {
    switch (type) {
      case 'addManager':
        this.onCreateManager();
        break;
      case 'addTechnician':
        this.onCreateTechnician();
        break;
      default:
        break;
    }
  }

  onCreateManager() {
      this.managerDlg.open();
  }

  checkValidation() {
    for (let controller in this.managerFrom.controls) {
        this.managerFrom.get(controller).markAsTouched();
    }
    if (this.managerFrom.invalid) {
        return false;
    }
    else {
        //this.onSignUpNow();
        this.onConfirmManager();
    }
  }

  onConfirmManager() {
    let data = {
        UserId: this.userInfo.getUserInfo('id'),
        Token: this.userInfo.getUserInfo('token'),
        Email: this.manager.Email,
        FirstName: this.manager.FirstName,
        LastName: this.manager.LastName,
        PhoneNumber: this.manager.PhoneNumber,
        Type: this.manager.Type,
        Status: this.status
    };

    if (this.manager.Type == 1) {
        let count = this.manager.list.length;
        data['Count'] = count;

        for (var i = 0; i < count; i++) {
            let brand = this.manager.list[i];
            data['BrandId' + i] = brand.id;
        }
    } else {
        data['GymId'] = this.manager.list.id;
    }

    let url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_MANAGER;
    this.http.post(url, data).subscribe(response => {
        let result = response.json();
        if (result.Success == true) {
            this.toast("Success on creating manager!", "success");
            this.refreshInfo(1);
        } else {
            this.toast("Failed on creating manager!", "danger");
        }
    }, error => {
        this.toast("Error on http request!", "danger");
    });
    this.managerDlg.close();
  }

  onCancelManager() {

    this.managerFrom.reset();
    this.managerDlg.close();
  }

  public toast(text, type) {
    var toast: Toast = {
        type: type,
        title: text,
        showCloseButton: true
    };

    this.mdToast.pop(toast);}

  refreshInfo(i) {
    let params = {
        UserId: this.userInfo.getUserInfo('id'),
        Token: this.userInfo.getUserInfo('token'),
        Type: this.userInfo.getUserInfo('type'),
        LastId: 0,
        Count: -1,
        Status: i
    };

      let url;
      url = EnvVariables.SERVER_ADDR + EnvVariables.MANAGER_LIST;
      this.http.post(url, params).subscribe(response => {
          let result = response.json();
          if (result.Success == true) {
              let list = result.Data;
              list.map((item, index) => {
                  list[index]['No'] = index + 1;
                  list[index]['name'] = item.firstName + ' ' + item.lastName;
              });
              this.userList = list;
          } else {
              this.toast("Failed on loading users!", "failed");
          }
      }, error => {
          this.toast("Error on http request!", "failed");
      });
  }

  onCreateTechnician() {
    console.log('this is techniciaan modal: ')

    this.techDlg.open();
  }

  checkTechValidatio() {
    for (let controller in this.techFrom.controls) {
        this.techFrom.get(controller).markAsTouched();
    }
    if (this.techFrom.invalid) {
        return false;
    }
    else {
        //this.onSignUpNow();
        this.onConfirmTechnician();
    }
  }

  onConfirmTechnician() {
    if (this.tech.FirstName == '') {
        this.toast("Input valid first name!", "danger");
        return;
    }

    if (this.tech.LastName == '') {
        this.toast("Input valid last name!", "danger");
        return;
    }

    if (!this.validateEmail(this.tech.Email)) {
        this.toast("Input valid email!", "danger");
        return;
    }
    let data = {
        UserId: this.userInfo.getUserInfo('id'),
        Token: this.userInfo.getUserInfo('token'),
        Email: this.tech.Email,
        FirstName: this.tech.FirstName,
        LastName: this.tech.LastName,
        PhoneNumber: this.tech.PhoneNumber,
        EquipmentType: this.equipmentType,
        TechManagerId: this.selTechManager.id,
        UserType: this.selTechManager.userType,
        Status: 1

    };
    let url = EnvVariables.SERVER_ADDR + EnvVariables.ADD_TECH;
    this.http.post(url, data).subscribe(response => {
        let result = response.json();
        if (result.Success == true) {
            this.toast("Success on creating technician!", "success");
            this.refreshTech();
        } else {
            this.toast("Failed on creating technician!", "danger");
        }
    }, error => {
        this.toast("Error on http request!", "danger");
    });
    this.techDlg.close();
  }

  validateEmail(email) {
    var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return re.test(email);
  }

  refreshTech() {
    let params = {
        UserId: this.userInfo.getUserInfo('id'),
        Token: this.userInfo.getUserInfo('token'),
        LastId: 0,
        Count: -1,
    };

    let url;
    url = EnvVariables.SERVER_ADDR + EnvVariables.TECH_LIST;
    this.http.post(url, params).subscribe(response => {
        let result = response.json();
        if (result.Success == true) {
            let list = result.Data;
            list.map((item, index) => {
                list[index]['No'] = index + 1;
                list[index]['name'] = item.firstName + ' ' + item.lastName;
                list[index]['phonenumber'] = item.phoneNumber;
            });
            this.techList = list;
            this.technicianList = list;
        } else {
            this.toast("Failed on loading techs!", "failed");
        }
    }, error => {
        this.toast("Error on http request!", "failed");
    });
  }

  onCancelTechnician() {
    this.techDlg.close();
  }
}
