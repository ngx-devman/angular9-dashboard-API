import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicingComponent } from './invoicing/invoicing.component';
import { SharedModule } from '../../shared/shared.module';
import { InvoicingPageRoutingModule } from './invoicing-page-routing.module';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';



@NgModule({
  declarations: [InvoicingComponent, InvoiceDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    InvoicingPageRoutingModule
  ]
})
export class InvoicingPageModule { }
