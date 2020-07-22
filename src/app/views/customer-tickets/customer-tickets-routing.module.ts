import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CustomerTicketsComponent } from "./customer-tickets.component";

const routes: Routes = [
  {
    path: "",
    component: CustomerTicketsComponent,
    data: {
      title: "Customer Tickets",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerTicketsRoutingModule {}
