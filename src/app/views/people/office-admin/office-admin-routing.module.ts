import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeAdminComponent } from './office-admin.component';

const routes: Routes = [
  {
    path: '',
    component: OfficeAdminComponent,
    data: {
      title: 'Office Admin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeAdminRouting {}
