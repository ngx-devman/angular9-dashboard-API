import { BuytagMainComponent } from './buytag-main/buytag-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BuyTagComponent } from './buytag.component';

const routes: Routes = [
  {
    path: '',
    component: BuytagMainComponent,
    data: {
      title: 'BuyTag'
    }
  },
  {
    path: 'detail',
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
export class BuyTagRoutingModule { }
