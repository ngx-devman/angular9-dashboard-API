import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BuyTagComponent } from './buytag.component';

const routes: Routes = [
  {
    path: '',
    component: BuyTagComponent,
    data: {
      title: 'BuyTag'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyTagRoutingModule {}
