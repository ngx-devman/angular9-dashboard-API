import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateInvoiceComponent } from './generate-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: GenerateInvoiceComponent,
    data: {
      title: 'Generate Invoice'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateInvoiceRoutingModule {}
