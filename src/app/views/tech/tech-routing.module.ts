import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechComponent } from './tech.component';

const routes: Routes = [
  {
    path: '',
    component: TechComponent,
    data: {
      title: 'Technician'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechRoutingModule {}
