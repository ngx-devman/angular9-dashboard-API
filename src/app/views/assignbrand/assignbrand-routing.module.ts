import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignBrandComponent } from './assignbrand.component';

const routes: Routes = [
  {
    path: '',
    component: AssignBrandComponent,
    data: {
      title: 'Brand'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignBrandRoutingModule {}
