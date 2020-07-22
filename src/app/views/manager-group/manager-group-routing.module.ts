import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ManagerGroupComponent } from './manager-group.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerGroupComponent,
    data: {
      title: 'Manager Group'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerGroupRoutingModule {}
