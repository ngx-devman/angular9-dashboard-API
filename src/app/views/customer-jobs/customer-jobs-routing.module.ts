import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CustomerJobsComponent } from "./customer-jobs.component";

const routes: Routes = [
  {
    path: "",
    component: CustomerJobsComponent,
    data: {
      title: "Customer Jobs",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerJobsRoutingModule {}
