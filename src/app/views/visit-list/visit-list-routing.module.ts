import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitListComponent } from './visit-list.component';

const routes: Routes = [
  {
    path: '',
    component: VisitListComponent,
    data: {
      title: 'Schedule/Jobs'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitListRoutingModule {}
