import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ViewuserComponent} from '../../views/viewuser/viewuser.component';
const routes: Routes = [
  {
    path: '',
    component: ViewuserComponent,
    data: {
      title: 'View user'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewuserRoutingModule {}
