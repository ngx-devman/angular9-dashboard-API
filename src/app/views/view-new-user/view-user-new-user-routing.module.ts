import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewNewUserComponent } from './view-new-user.component';

const routes: Routes = [
  {
    path: '',
    component: ViewNewUserComponent,
    data: {
      title: 'View New user'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewNewUserRoutingModule {}
