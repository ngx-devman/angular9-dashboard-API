import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicingComponent } from './invoicing/invoicing.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicingComponent
  },
  {
    path: 'invoice-detail',
    component: InvoiceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicingPageRoutingModule {}
