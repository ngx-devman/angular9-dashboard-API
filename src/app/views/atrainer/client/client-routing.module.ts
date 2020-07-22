import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ATrainerComponent } from './client.component';

const routes: Routes = [
  {
    path: '',
    component: ATrainerComponent,
    data: {
      title: 'Client'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
