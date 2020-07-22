import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RatesComponent } from './rates/rates.component';
import { SharedCpnModule } from '../../components/shared-cpn.module';


@NgModule({
  declarations: [InvoiceComponent, RatesComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,
    SharedCpnModule
  ]
})
export class InvoicingModule { }
