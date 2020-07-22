import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerGroupComponent } from '../../manager-group/manager-group.component';
import { PurchasedTagComponent } from './purchased-tag.component';

const routes: Routes = [
  {
    path: '',
    component: PurchasedTagComponent,
    data: {
      title: 'PurchasedTag'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class    PurchasedTagRoutingModule {}
