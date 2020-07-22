import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EquipmentsComponent } from './equipments.component';

const routes: Routes = [
  {
    path: '',
    component:EquipmentsComponent,
    data: {
      title: 'Equipments'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsRoutingModule {}
