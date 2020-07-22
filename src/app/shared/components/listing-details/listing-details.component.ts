import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiProvider } from "../../../service/api";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { UserService } from '../../users/user.service';
import { MatDialog } from '@angular/material';
import { DefaultModelComponent } from '../default-model/default-model.component';
import { ToasterService } from 'angular2-toaster';
@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss']
})
export class ListingDetailsComponent implements OnInit {
  @Input() type: string;
  @Input() detailsDto: any;
  @Input() jobsConfig: any;
  @Input() equipmentConfig: any;
  @Input() customerSyncDetails: any;

  @Output() editCustomer = new EventEmitter();

  public id: String;
  Employeedata: any[];
  jobTypeData: any[];
  vendorList: any[];
  vendorData: any[];
  showCreateTicket:boolean = false;
  constructor(
    private apiProvider: ApiProvider,
    private router: Router,
    private route: ActivatedRoute,
    private userInfo: UserService,
    private dialog: MatDialog,
    private toast: ToasterService
  ) { }

  ngOnInit(): void {
    console.log(this.detailsDto);
    this.showCreateTicket = false;
    this.getListingParams();
    this.getAllEmployee();
  }

  private getListingParams(): void {
    // handing types and on the basis of type we will fetch params
    switch (this.type) {
      case ListingTypes.CUSTOMER:
        this.getCustomerParams();
        break;
      default:
        this.handleDefault();
    }
  }

  private getCustomerParams() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  onEditCustomer(): void {
    this.editCustomer.emit(this.detailsDto);
  }

  createTicket(): void {
    // this.apiProvider.updateShowServiceTicket(true);
    // this.router.navigate(["/schedule"]);
    const dialogRef = this.dialog.open(DefaultModelComponent, {
      width: '474px',
      data: this.generateModelValues(),
      panelClass: 'defaultModel'
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      if (data.data.createNew) {
        this.createServiceTicket(data.data.dataValues);
      }
      this.apiProvider.updateShowServiceTicket(null);
    });
  }

  createServiceTicket(data: any) {
    let params = {
      scheduleTime: data.date,
      customerId: data.selectedCustomer,
      comment: data.comment,
      note: data.note
    }

    this.apiProvider.createServiceTicket(params).subscribe((response: any) => {
      console.log(response);
      if (response.status == 1) {
        this.toast.pop('success', '', response.message);
        if (data.createJob) {
          this.createJob(data);
        }
      } else {
        this.toast.pop('failed', '', response.message);
      }
    });
  }

  createJob(data) {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getServiceTicket().subscribe(response => {
      console.log("serviceTicket", response);
      if (response['status'] == '1') {
        let serviceTicketId = response['serviceTickets'][response['serviceTickets'].length - 1]._id;
        this.createserviceSingleJob(data, serviceTicketId);
      }
    })
  }

  createserviceSingleJob(data, id) {
    let params = {
      dateTime: data.date,
      ticketId: id,
      technicianId: data.selectedTechnician,
      customerId: data.selectedCustomer,
      jobTypeId: data.jobType,
      description: data.note,
      employeeType: data.employeeType
    }

    if (data.customEquipment != "") {
      params['equipmentId'] = data.customEquipment
    }

    this.apiProvider.createJob(params).subscribe((response: any) => {
      console.log(response);
      if (response.status == 1) {
        this.toast.pop('success', '', response.message);
      } else {
        this.toast.pop('failed', '', response.message);
      }

    });
  }

  routeChangeById(dto): void {
    const { route } = dto;
    this.router.navigate([`${route}/${this.id}`]);
  }

  handleDefault(): void {
    this.router.navigate(['/customer']);
  }

  generateModelValues() {

    let customerList = this.autoCompleteArray(this.detailsDto);
    let selectTechnicians = this.autoCompleteTech(this.Employeedata);
    let equipmentList = [];
    let jobTypes = this.autoCompleteJob(this.jobTypeData);
    let vendorList = [];

    let dataInputs = {
      selectCustomer: customerList,
      customEquipment: equipmentList,
      jobTypes: jobTypes,
      selectTechnicians: selectTechnicians,
      selectVendor: vendorList
    }
    let dataValues = {
      title: 'New Service Ticket',
      status: 'scheduleJob',
      selectedCustomer: this.detailsDto._id,
      customEquipment: '',
      jobType: '',
      note: '',
      comment: '',
      date: null,
      createJob: false,
      selectedTechnician: '',
      employeeType: 0,
      cusHeight: true,
      hideCustomer: true
    }
    if (this.vendorList.length > 0) {
      let vendors = this.autoCompleteVendor(this.vendorList);
      dataInputs.selectVendor = vendors;
    }
    let data = {
      dataInputs: dataInputs,
      dataValues: dataValues
    }
    return data;
  }
  autoCompleteArray(list) {
    console.log(list);
    let newList = [];
    newList.push(this.autoComplet(list._id, list.profile.displayName));
    console.log(newList);
    return newList;
  }

  autoComplet(id, name) {
    let a = {
      id: id,
      name: name
    }
    return a;
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

  autoCompleteVendor(list) {
    let newList = [];
    list.map(l => {
      newList.push(this.autoComplet(l.contractor._id, l.contractor.info.name));
    });
    return newList;
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
      console.log("response jobs", response);
      this.jobTypeData = response['types'];
      this.getVendors();
    });
  }

  getVendors() {
    this.apiProvider.getVendors().subscribe((response: any) => {
      if (response.status == 1) {
        console.log(response);
        this.vendorData = [...response.contracts];
        this.vendorList = response.contracts;
        console.log(this.vendorList);
        console.log(this.detailsDto);
        this.showCreateTicket = true;
      }
    });
  }
}

// enum for cheking types
enum ListingTypes {
  CUSTOMER = 'customer'
}
