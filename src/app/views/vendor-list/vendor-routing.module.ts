import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorListComponent } from './vendor-list/vendor-list.component';

const routes: Routes = [
  {
    path: '',
    component: VendorListComponent,
    data: {
      title: 'Vendors'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorListRoutingModule {}
