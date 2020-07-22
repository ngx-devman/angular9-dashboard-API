import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiProvider } from '../../../service/api';
import { MatDialog } from '@angular/material';
import { DefaultModelComponent } from '../../../shared/components/default-model/default-model.component';
import { UserService } from '../../../shared/users/user.service';
import { Subscription } from 'rxjs';
import { Toast, ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {

  constructor(
    private apiProvider: ApiProvider, 
    public dialog: MatDialog, 
    private userInfo: UserService,
    private mdToast: ToasterService,
  ) { }
  currentUser;
  tableHeads: any[] = ['Job ID', 'Customer', 'Type', 'Schedule', 'Time', 'Options'];
  pendingJobsData: any[] = [];
  pendingJobsList: any[] = [];
  startedJobsData: any[] = [];
  startedJobsList: any[] = [];
  cancelJobsData: any[] = [];
  cancelJobsList: any[] = [];
  completeJobsData: any[] = [];
  completeJobsList: any[] = [];
  accountJobsList: any[] = [];
  accountJobsData: any[] = [];
  historyJobsData: any[] = [];
  historyJobsList: any[] = [];
  userProfile: any;
  searchJob = {
    name: ''
  };
  userType: string;
  technicianData: any[] = [];
  Employeedata: any[] = [];
  subscription: Subscription;
  jobTypeData:any[] = [];
  customerEquipments;
  vendorList:any[] = [];
  vendorData:any[] = [];

  permissions:permissionGroup[] = PERMISSIONS;
  permissionHead = ['Functionality', 'View', 'Add/Edit'];

  ngOnInit() {
    this.getAllEmployee();
    this.getTechnician();
    this.getVendors();
    this.apiProvider.individualProfile.subscribe((profile: any) => {
      console.log(profile);
      this.userProfile = profile;
      this.userType = this.userProfile.type;
      if(this.userType == 'CompanyAdmin'){
        this.permissions.map((permission:permissionGroup) => {
          permission.edit = true;
          permission.view = true;
        });
      };
      if(this.userType == 'Vendor'){
        this.permissionHead = ['Functionality'];
      } else{
        this.permissionHead = ['Functionality', 'View', 'Add/Edit'];
      }

      if (profile.type == 'Vendor') {
        let params = {
          email: profile.details.info.companyEmail
        }
        this.apiProvider.searchVendor(params).subscribe((vendor: any) => {
          console.log(vendor);
          this.currentUser = vendor.contractors[0];
          this.formatJobs(this.currentUser._id);
          // this.apiProvider.getJob().subscribe((jobs: any) => {
          //   console.log(jobs);
          //   jobs.jobs.map(job => {
          //     if (job.technician._id == this.currentUser._id) {
          //       if (job.status == 0) {
          //         this.pendingJobsData.push(job);
          //         this.pendingJobsList.push(job);
          //       }
          //       if (job.status == 1) {
          //         this.startedJobsData.push(job);
          //         this.startedJobsList.push(job);
          //       }
          //       if (job.status == 2) {
          //         this.completeJobsData.push(job);
          //         this.completeJobsList.push(job);
          //       }
          //       if (job.status == 3) {
          //         this.cancelJobsData.push(job);
          //         this.cancelJobsList.push(job);
          //       }
          //     }
          //   });
          // });
        });
      } else {
        this.currentUser = profile.details;
        this.formatJobs(this.currentUser._id);
      }
    });
  }

  formatJobs(userId) {
    this.pendingJobsData = [];
    this.pendingJobsList = [];
    this.startedJobsData = [];
    this.startedJobsList = [];
    this.completeJobsData = [];
    this.completeJobsList = [];
    this.cancelJobsData = [];
    this.cancelJobsList = [];

    this.apiProvider.getJob().subscribe((jobs: any) => {
      console.log(jobs);
      jobs.jobs.map(job => {
        if (job.technician._id == userId) {
          if (job.status == 0) {
            this.pendingJobsData.push(job);
            this.pendingJobsList.push(job);
          }
          if (job.status == 1) {
            this.startedJobsData.push(job);
            this.startedJobsList.push(job);
          }
          if (job.status == 2) {
            this.completeJobsData.push(job);
            this.completeJobsList.push(job);
          }
          if (job.status == 3) {
            this.cancelJobsData.push(job);
            this.cancelJobsList.push(job);
          }
        }
      });
      this.accountJobsData = this.pendingJobsData;
      this.accountJobsList = this.pendingJobsList;
      this.historyJobsData = this.completeJobsData;
      this.historyJobsList = this.completeJobsList;
    });
  }

  accountJobSearch(event) {
    this.searchJob.name = event;
    this.accountJobsList = this.filterJobs(this.accountJobsData);
  }

  historyJobSearch(event) {
    this.searchJob.name = event;
    this.historyJobsList = this.filterJobs(this.historyJobsData);
  }

  editJobs(event) {
    const dialogRef = this.dialog.open(DefaultModelComponent, {
      width: '474px',
      data: this.generateJobModalValues(event),
      panelClass: 'defaultModel'
    });
    dialogRef.afterClosed().subscribe((data:any) => {
        console.log(data);
        if(data.data.job == 'update'){
            let jobData = {
                jobId: event._id,
                technicianId: data.data.dataValues.selectedTechnician,
                dateTime: data.data.dataValues.date
            }
            this.apiProvider.editJob(jobData).subscribe((response:any) => {
                if(response.status == 1){
                    this.toast(response.message, 'success');
                    this.formatJobs(this.currentUser._id);
                } else{
                    console.log(response);
                    this.toast(response.message, 'failed');
                }
            });
        } 
        if(data.data.job == 'cancel'){
            let jobData = {
                jobId: event._id,
                status: 3,
                comment: data.data.dataValues.description
            }
            this.apiProvider.updateJob(jobData).subscribe((response:any) => {
                
                if(response.status == 1){
                    this.toast(response.message, 'success');
                    this.formatJobs(this.currentUser._id);
                } else{
                    console.log(response);
                    this.toast(response.message, 'failed');
                }
            });
        }
    });
  }

  accountJobStatus(event) {
    if (event == 'pending') {
      this.accountJobsList = this.pendingJobsList;
      this.accountJobsData = this.pendingJobsData;
    } else {
      this.accountJobsList = this.startedJobsList;
      this.accountJobsData = this.startedJobsData;
    }
  }

  historyJobStatus(event) {
    if (event == 'cancel') {
      this.historyJobsList = this.cancelJobsList;
      this.historyJobsData = this.cancelJobsData;
    } else {
      this.historyJobsList = this.completeJobsList;
      this.historyJobsData = this.completeJobsData;
    }
  }

  filterJobs(jobData) {
    let list = [];
    jobData.map(item => {
      if (this.searchJob.name.length > 0 && item.customer.profile.displayName.toLowerCase().indexOf(this.searchJob.name.toLowerCase()) == -1) {
        return;
      }
      list.push(item);
    });
    return list;
  }

  editProfile(event) {
    const dialogRef = this.dialog.open(DefaultModelComponent, {
      width: '574px',
      data: this.generateInfoModalValues(this.userProfile, 'Edit User', 'editUser'),
      panelClass: 'defaultModel'
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      if (data.data.createNew) {
        let updatedUser = data.data.details;
        let params = {
          firstName: updatedUser.profile.firstName,
          lastName: updatedUser.profile.lastName,
          imageUrl: updatedUser.profile.imageUrl,
          street: updatedUser.address.street,
          city: updatedUser.address.city,
          state: updatedUser.address.state,
          zipCode: updatedUser.address.zipCode,
          phone: updatedUser.contact.phone
        }
        this.apiProvider.updateProfile(params).subscribe((response: any) => {
          console.log(response);
          if (response.status == '1') {
            updatedUser.profile.displayName = `${updatedUser.profile.firstName} ${updatedUser.profile.lastName}`;
            this.userInfo.setUserdata("userInfo", updatedUser);
            this.toast(response.message, 'success');
            this.apiProvider.updateUserProfileStatus(updatedUser);
          }
        });
      }
    });
  }

  editPassword(event) {
    let userDetails = {
      type: this.userProfile.type,
      prevPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    const dialogRef = this.dialog.open(DefaultModelComponent, {
      width: '474px',
      data: this.generateInfoModalValues(userDetails, 'Update Password', 'editUserPassword'),
      panelClass: 'defaultModel'
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      if (data.data.createNew) {
        let params = {
          currentPassword: data.data.prevPassword,
          newPassword: data.data.newPassword
        }
        this.apiProvider.changePassword(params).subscribe((response: any) => {
          console.log(response);
          if (response.status == '1') {
            this.toast(response.message, 'success');
          } else{
            this.toast(response.message, 'failed');
          }
        });
      }
    });
  }

  generateInfoModalValues(event, title, status) {
    let dataValues = {
      title: title,
      status: status,
      data: event,
      cusHeight: false
    }
    let data = {
      dataValues: dataValues
    }
    return data;
  }

  getTechnician() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getTechnician().subscribe(response => {
      console.log("tech data", response);
      if (response['status'] == '1') {
        this.technicianData = response['users'];
        console.log(this.technicianData);
      }
    })
  }

  getAllEmployee() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getAllEmployee().subscribe(response => {
      console.log(response);
      console.log("All employee", response['employees'])
      // if (response['status'] == '1') {
      this.Employeedata = response['employees']
      try {
        let adminData = {
          profile: response['company'].admin.profile,
          _id: response['company'].admin._id
        }
        this.Employeedata.push(adminData);
      }
      catch (error) {
        console.log(error);
      }
      // }
      this.getType();
    });
  }

  getType() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getJobType().subscribe(response => {
      this.subscription = this.apiProvider.showServiceTicket.subscribe((data: any) => {
        console.log(data);
        // this.createType();
        console.log("response jobs", response);
        this.jobTypeData = response['types'];
        this.apiProvider.updateAppLoading(false);
      });
    });
  }

  getCustomerEquipments(id){
    let params = {
      customerId: id
    }

    this.apiProvider.getCustomerEquipment(params).subscribe((equipments:any) => {
      if(equipments.status == 1){
        this.customerEquipments = this.autoCompleteJob(equipments.equipments);
      }
    });
  }

  getVendors(){
    this.apiProvider.getVendors().subscribe((response:any) => {
      if(response.status == 1){
          console.log(response);
          this.vendorData = [...response.contracts];
          this.vendorList = response.contracts;
          console.log(this.vendorList);  
      }
    });
  }

  generateJobModalValues(job?) {
    let selectTechnicians = this.autoCompleteTech(this.Employeedata);
    let equipmentList = this.customerEquipments;
    let jobTypes = this.autoCompleteJob(this.jobTypeData);
    let vendorList = [];

    let dataInputs = {
      customEquipment: equipmentList,
      jobTypes: jobTypes,
      selectTechnicians: selectTechnicians,
      selectVendor: vendorList
    }
    let dataValues = {
      title: 'Create Job',
      status: 'scheduleServiceJob',
      customEquipment: '',
      jobType: '',
      description: '',
      date: null,
      selectedTechnician: '',
      cusHeight: false,
      employeeType: 0,
      updateJob: false
    }
    if (this.vendorList.length > 0) {
      let vendors = this.autoCompleteVendor(this.vendorList);
      dataInputs.selectVendor = vendors;
    }
    if (job) {
      dataValues.title = 'Edit Job',
        dataValues.updateJob = true;
      dataValues.jobType = job.type._id;
      dataValues.description = job.description;
      dataValues.date = job.dateTime;
      dataValues.selectedTechnician = job.technician._id;
      if (job.technician.__t) {
        dataValues.employeeType == 1;
      }
    }
    let data = {
      dataInputs: dataInputs,
      dataValues: dataValues
    }
    return data;
  }

  autoCompleteTech(list) {
    let newList = [];
    list.map(l => {
      newList.push(this.autoComplet(l._id, l.profile.displayName));
    });
    return newList;
  }

  autoCompleteJob(list) {
    let newList = [];
    list.map(l => {
      newList.push(this.autoComplet(l._id, l.title));
    });
    return newList;
  }

  autoComplet(id, name) {
    let a = {
      id: id,
      name: name
    }
    return a;
  }
  
  autoCompleteVendor(list){
    let newList = [];
    list.map(l => {
        newList.push(this.autoComplet(l.contractor._id, l.contractor.info.companyName));
    });
    return newList; 
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

export class permissionGroup{
  title: string;
  view: boolean;
  edit: boolean;
}

export const PERMISSIONS:permissionGroup[] = [
  {title: 'Users', view: false, edit: false},
  {title: 'Equipments', view: false, edit: false},
  {title: 'Customers', view: false, edit: false},
  {title: 'Jobs', view: false, edit: false},
  {title: 'Groups', view: false, edit: false},
  {title: 'Company Equipments', view: false, edit: false},
  {title: 'Vendors', view: false, edit: false},
  {title: 'Service Tickets', view: false, edit: false},
  {title: 'Report Number', view: false, edit: false}
]