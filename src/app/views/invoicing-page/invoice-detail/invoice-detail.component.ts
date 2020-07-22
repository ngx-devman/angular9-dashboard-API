import { Component, OnInit } from '@angular/core';
import { ApiProvider } from '../../../service/api';
import { MatDialog } from '@angular/material';
import { DefaultModelComponent } from '../../../shared/components/default-model/default-model.component';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  invoice: any;
  constructor(private apiProvider: ApiProvider, private dialog: MatDialog) { }
  saleTax:any[];
  ngOnInit() {
    this.apiProvider.invoiceDetail.subscribe((invoice: any) => {
      if (invoice) {
        this.apiProvider.getJobDetails(invoice.job._id).subscribe((jobDetail: any) => {
          console.log(jobDetail);
          console.log(invoice);
          invoice.job = jobDetail.job;
          invoice['scans'] = jobDetail.scans;
          this.invoice = invoice;

        });
      }
    });

    this.apiProvider.getSaleTax().subscribe((tax:any) => {
      let zeroTax = {
        _id: '0',
        tax: 0
      }
      tax.taxes.push(zeroTax);
      this.saleTax = tax.taxes;
    });
  }

  editInvoice() {
    const dialogRef = this.dialog.open(DefaultModelComponent, {
      width: '474px',
      data: this.generateModelValues(),
      panelClass: 'defaultModel'
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      let invoiceData = data.data.dataValues;
      if(data.data.job == 'update'){
        let appliedTax = invoiceData.tax;
        // if (invoiceData.tax != '0') {
        //   this.saleTax.map((taxes:any) => {
        //     if(taxes._id === invoiceData.tax){
        //       appliedTax = taxes.tax;
        //     }
        //   });
        // } else {
        //   appliedTax = 0;
        // }
        let body = {
          invoiceId: invoiceData.invoiceId,
          tax: appliedTax,
          charges: invoiceData.charges
        }
        console.log(body);
        this.apiProvider.updateInvoice(body).subscribe((invoice:any) => {
          console.log(invoice);
          if(invoice.status == 1) {
            let body = {
              invoiceId: invoiceData.invoiceId
            };
            this.apiProvider.getInvoiceDetail(body).subscribe((updatedInvoice:any) => {
              this.invoice.charges = updatedInvoice.invoices[0].charges;
              this.invoice.tax = updatedInvoice.invoices[0].tax;
              this.invoice.taxPercentage = updatedInvoice.invoices[0].taxPercentage;
              this.invoice.total = updatedInvoice.invoices[0].total;
            });
          }
        });
      }
    });
  }

  generateModelValues() {
    let jobData = this.invoice.job;

    let dataInputs = {
      jobData: jobData,
      taxes: this.saleTax
    }
    let dataValues = {
      title: 'Update Invoice',
      status: 'invoice',
      invoiceId: this.invoice._id,
      tax: this.invoice.taxPercentage,
      charges: this.invoice.charges,
      editCharges: false,
      cusHeight: true,
      updateJob: true
    }
    let data = {
      dataInputs: dataInputs,
      dataValues: dataValues
    }
    return data;
  }
}
