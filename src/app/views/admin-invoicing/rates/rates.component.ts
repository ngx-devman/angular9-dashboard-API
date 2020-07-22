import { Component, OnInit } from '@angular/core';
import { ApiProvider } from '../../../service/api';
import { UserService } from '../../../shared/users/user.service';
import { MatDialog } from '@angular/material';
import { DefaultModelComponent } from '../../../shared/components/default-model/default-model.component';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {

  constructor(
    private apiProvider: ApiProvider, 
    private userInfo: UserService,
    private dialog: MatDialog
  ) { }
  charges: any[] = [];
  listTableHeads = ['No', 'Job Type', 'Method', 'Rate', 'Option'];
  userData: any;
  jobTypes: any[];
  navItem = [
    {label: 'Invoicing', route: '/invoice-page', clickAction: false, active: false},
    {label: 'Rates', route: '/invoice/rates', clickAction: false, active: true},
    {label: 'Sale Tax', route: '', clickAction: true, active: false}
  ];
  saleTax;
  ngOnInit() {
    this.userData = JSON.parse(this.userInfo.getUserData('userInfo'));
    this.getJobCharges();
    this.apiProvider.getJobType().subscribe((jobTypes: any) => {
      console.log(jobTypes);
      if (jobTypes.status == 1) {
        this.jobTypes = jobTypes.types;
      }
    });

    this.apiProvider.getSaleTax().subscribe((saleTax:any) => {
      console.log(saleTax);
      if(saleTax.taxes.length > 0) {
        this.saleTax = saleTax.taxes;
        console.log(this.saleTax);
      }
    });

  }

  editTheJob(event) {
    console.log(event);
    let modelData = this.generateModelValues();
    modelData.dataValues.charges = event.charges;
    modelData.dataValues.jobType = event.jobType._id;
    modelData.dataValues.isFixed = event.isFixed;
    modelData.dataValues.updateJob = true;
    if(event.salesTax) {
      modelData.dataValues.tax = event.salesTax._id;
      modelData.dataValues.taxable = true;
    } else{
      modelData.dataValues.taxable = false;
    }
    const dialogRef = this.dialog.open(DefaultModelComponent, {
      width: '474px',
      data: modelData,
      panelClass: 'defaultModel'
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      let rate = data.data.dataValues;
      if(data.data.job == 'update'){
        let body = {
          jobChargesId: event._id,
          isFixed: rate.isFixed,
          charges: rate.charges,
          sales_tax_id: rate.tax 
        }
        if(!rate.taxable){
          body.sales_tax_id = '';
        }
        this.apiProvider.updateJobCharges(body).subscribe((charges:any) => {
          console.log(charges);
          if(charges.status == 1){
            this.getJobCharges();
          }
        });
      }
    });
  }

  createJobRate() {
    const dialogRef = this.dialog.open(DefaultModelComponent, {
      width: '474px',
      data: this.generateModelValues(),
      panelClass: 'defaultModel'
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      let rate = data.data.dataValues;
      if(data.data.createNew){
        let body = {
          jobTypeId: rate.jobType,
          isFixed: rate.isFixed,
          charges: rate.charges,
          sales_tax_id: rate.tax
        }
        this.apiProvider.createJobCharges(body).subscribe((charges:any) => {
          console.log(charges);
          if(charges.status == 1){
            this.getJobCharges();
          }
        });
      }
    });
  }

  generateModelValues() {
    console.log(this.jobTypes);
    let jobTypes = this.autoCompleteJob(this.jobTypes);

    let dataInputs = {
      jobTypes: jobTypes,
      saleTax: this.saleTax
    }
    let dataValues = {
      title: 'New Job Rate',
      status: 'jobRate',
      jobType: '',
      isFixed: null,
      tax:0,
      charges: 0,
      updateJob: false,
      cusHeight: true,
      taxable: false
    }
    let data = {
      dataInputs: dataInputs,
      dataValues: dataValues
    }
    return data;
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

  getJobCharges(){
    this.apiProvider.getJobCharges().subscribe((charges: any) => {
      if (charges.status == 1) {
        const latestCharges = charges.jobCharges;
        let formatCharges = [];

        latestCharges.map(charge => {
          if (charge.jobType) {
            formatCharges.push(charge);
          }
        });
        this.charges = formatCharges;
        console.log(this.charges);
      }
    });
  }
  openPopUp(event){}
}
