import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewUserInfoComponent } from './view-user-info.component';

const routes: Routes = [
  {
    path: '',
    component: ViewUserInfoComponent,
    data: {
      title: 'View user info'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewUserInfoRoutingModule {}
