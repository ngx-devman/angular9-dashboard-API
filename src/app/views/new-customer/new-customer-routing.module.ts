import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewCustomerComponent } from "./new-customer.component";
import { SaveChangesGuard } from '../.././guard/deactivate-guard';

const routes: Routes = [
  {
    path: "",
    component: NewCustomerComponent,
    data: {
      title: "New Customer"
    },
    canDeactivate: [SaveChangesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCustomerRoutingModule {}
