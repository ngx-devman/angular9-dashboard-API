import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DefaultModelComponent } from '../../../shared/components/default-model/default-model.component';
import { ApiProvider } from '../../../service/api';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(
    private router:Router, 
    private dialog:MatDialog,
    private apiProvider: ApiProvider
  ) { }

  history = [
    { name: "Sales Tax", click: "1", i: "money", color: '#49b8ff' },
    { name: "Rates", click: "/invoice/rates", i: "money", color: '#0082c3' },
  ]

  saleTax;
  saleTaxExsist: boolean = false;

  ngOnInit() {
   this.getSaleTax();
  }

  navigate(url) {
    if(url == 1){
      this.openSaleTax();
    } else{
      this.router.navigate([url]);
    }
  }
  
  openSaleTax(){
    if(this.saleTaxExsist) {
      this.editSaleTax();
    } else{
      this.createSaleTax();
    }
    
  }

  createSaleTax() {
    const dialogRef = this.dialog.open(DefaultModelComponent, {
      width: '474px',
      data: this.generateModelValues(),
      panelClass: 'defaultModel'
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      let tax = data.data.dataValues;
      if(data.data.createNew){
        let body = {
          state: tax.state,
          tax: tax.tax
        }
        this.apiProvider.createSaleTax(body).subscribe((charges:any) => {
          this.getSaleTax();
        });
      }
    });
  }

  editSaleTax() {
    let modelData = this.generateModelValues();
    modelData.dataValues.state = this.saleTax.state;
    modelData.dataValues.tax = this.saleTax.tax;
    modelData.dataValues.title = 'Sale Tax';
    modelData.dataValues.updateJob = true;
    const dialogRef = this.dialog.open(DefaultModelComponent, {
      width: '474px',
      data: modelData,
      panelClass: 'defaultModel'
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      let tax = data.data.dataValues;
      if(data.data.job == 'update'){
        let body = {
          salesTaxId: this.saleTax._id,
          state: tax.state,
          tax: tax.tax
        }
        this.apiProvider.updateSaleTax(body).subscribe((charges:any) => {
          this.getSaleTax();
        });
      }
    });
  }

  generateModelValues() {
    
    let dataValues = {
      title: 'New Sale Tax',
      status: 'saleTax',
      state: '',
      tax: 0,
      cusHeight: true,
      updateJob: false,
      editSaleTax: false
    }
    let data = {
      dataValues: dataValues
    }
    return data;
  }

  getSaleTax(){
    this.apiProvider.getSaleTax().subscribe((saleTax:any) => {
      if(saleTax.status == 1 && saleTax.taxes.length > 0) {
        this.saleTax = saleTax.taxes[0];
        this.saleTaxExsist = true;
        console.log(this.saleTax);
      }
    });
  }

}
