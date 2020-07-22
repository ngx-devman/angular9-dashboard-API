import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AdminComponent } from './admin.component';
import { VendorsComponent } from './vendors/vendors.component';
import { EmployeersComponent } from './employeers/employeers.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: '',
        component: AdminComponent,
      },
      {
        path: 'vendors',
        component: VendorsComponent
      },
      {
        path: 'employeers',
        component: EmployeersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
