import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechManagerComponent } from './tech-manager.component';

const routes: Routes = [
  {
    path: '',
    component: TechManagerComponent,
    data: {
      title: 'Tech_Manager'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechManagerRoutingModule {}
