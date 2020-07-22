import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerComponent } from './manager.component';
import { ManagerGroupComponent } from '../../manager-group/manager-group.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    data: {
      title: 'Manager'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule {}
