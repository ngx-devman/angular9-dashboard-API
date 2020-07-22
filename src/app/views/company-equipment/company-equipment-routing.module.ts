import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyEquipmentComponent } from './company-equipment.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyEquipmentComponent,
    data: {
      title: 'Company Equipment'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyEquipmentRoutingModule {}
