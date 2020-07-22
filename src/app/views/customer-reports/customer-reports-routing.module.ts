import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CustomerReportsComponent } from "./customer-reports.component";

const routes: Routes = [
  {
    path: "",
    component: CustomerReportsComponent,
    data: {
      title: "Customer Reports",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerReportsRoutingModule {}
