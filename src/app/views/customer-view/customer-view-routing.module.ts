import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CustomerViewComponent } from "./customer-view.component";

const routes: Routes = [
  {
    path: "",
    component: CustomerViewComponent,
    data: {
      title: "Customer View",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerViewRoutingModule {}
