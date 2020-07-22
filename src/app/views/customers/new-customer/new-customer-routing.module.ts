import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewCustomerComponent } from "./new-customer.component";

const routes: Routes = [
  {
    path: "",
    component: NewCustomerComponent,
    data: {
      title: "New Customer"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCustomerRoutingModule {}
