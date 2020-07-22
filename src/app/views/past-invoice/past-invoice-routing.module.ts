import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PastInvoiceComponent } from './past-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: PastInvoiceComponent,
    data: {
      title: 'Past Invoice'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PastInvoiceRoutingModule {}
