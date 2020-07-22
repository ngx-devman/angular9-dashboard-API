import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventorysComponent } from './inventorys.component';

const routes: Routes = [
  {
    path: '',
    component: InventorysComponent,
    data: {
      title: 'Inventorys'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventorysRoutingModule {}
