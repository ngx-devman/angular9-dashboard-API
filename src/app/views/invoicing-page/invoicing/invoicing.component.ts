import { Component, OnInit } from '@angular/core';
import { ApiProvider } from '../../../service/api';
import { MatDialog } from '@angular/material';
import { DefaultModelComponent } from '../../../shared/components/default-model/default-model.component';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrls: ['./invoicing.component.scss']
})
export class InvoicingComponent implements OnInit {

  constructor(
    private apiProvider:ApiProvider,
    private dialog: MatDialog
  ) { }
  completedJobs: any[] = [];
  listTableHeads = ['Job ID', 'Technician', 'Customer', 'Type', 'Schedule', 'Options'];
  secondListTableHeads = ['Invoice ID', 'Job ID', 'Customer', 'Type', 'Amount', 'Tax', 'Total', 'Option'];
  invoices: any[] = [];
  secondListTitle: string = 'Invoices';
  listTitle: string = 'Complete Jobs';
  navItem = [
    {label: 'Invoicing', route: '/invoice-page', clickAction: false, active: true},
    {label: 'Rates', route: '/invoice/rates', clickAction: false, active: false},
    {label: 'Sale Tax', route: '', clickAction: true, active: false}
  ];
  saleTax: any[];

  ngOnInit() {
    this.getJobs();
    this.apiProvider.getSaleTax().subscribe((tax:any) => {
      let zeroTax = {
        _id: '0',
        tax: 0
      }
      tax.taxes.push(zeroTax);
      this.saleTax = tax.taxes;
    });
  }

  editTheJob(event){
    console.log(event);
    const dialogRef = this.dialog.open(DefaultModelComponent, {
      width: '474px',
      data: this.generateModelValues(event),
      panelClass: 'defaultModel'
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      let invoiceData = data.data.dataValues;
      if(data.data.createNew){
        let appliedTax;
        if (invoiceData.tax != '0') {
          this.saleTax.map((taxes:any) => {
            if(taxes._id === invoiceData.tax){
              appliedTax = taxes.tax;
            }
          });
        } else {
          appliedTax = 0;
        }
        let body = {
          jobId: invoiceData.jobId,
          tax: appliedTax,
          charges: invoiceData.charges
        }
        console.log(body);
        this.apiProvider.generateInvoice(body).subscribe((invoice:any) => {
          this.getJobs();
        });
      }
    });
  }

  generateModelValues(job) {
    let jobData = job;

    let dataInputs = {
      jobData: jobData,
      taxes: this.saleTax
    }
    let dataValues = {
      title: 'Generate Inovice',
      status: 'invoice',
      jobId: job._id,
      tax: job.salesTax,
      charges: job.charges,
      editCharges: false,
      cusHeight: true
    }
    let data = {
      dataInputs: dataInputs,
      dataValues: dataValues
    }
    return data;
  }

  getJobs(){
    this.apiProvider.getJob().subscribe((jobs:any) => {
      this.completedJobs = [];
      jobs.jobs.map((job:any) => {
        if(job.status == 2){
          job['invoiceGenerated'] = false;
          this.completedJobs.push(job);
        }
      });
      
      console.log(this.completedJobs);
      if(this.completedJobs.length > 0){
        this.listTitle = `${this.listTitle} (${this.completedJobs.length})`;
      }
      this.apiProvider.getInvoices().subscribe((invoices:any) => {
        console.log(invoices);
        this.invoices = invoices.invoices;
        if(this.invoices.length > 0){
          this.secondListTitle = `${this.secondListTitle} (${this.invoices.length})`;
        }
        this.invoices.map((invoice:any) => {
          this.completedJobs.map((job:any) => {
            if(invoice.job._id === job._id){
              job.invoiceGenerated = true;
            }
          });
        });
        console.log(this.completedJobs);
      });
    });
  }

  openPopUp(event){
    console.log(event);
  }

}
