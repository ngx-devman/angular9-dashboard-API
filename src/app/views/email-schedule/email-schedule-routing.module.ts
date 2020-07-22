import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailScheduleComponent } from './email-schedule.component';

const routes: Routes = [
  {
    path: '',
    component: EmailScheduleComponent,
    data: {
      title: 'email-schedule'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailScheduleRoutingModule {}
