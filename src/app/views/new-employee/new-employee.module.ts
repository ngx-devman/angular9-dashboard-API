
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Routing
import { NewEmployeeRoutingModule } from "./new-employee-routing.module";

import { NewEmployeeComponent } from "./new-employee.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NewEmployeeRoutingModule,
  ],
  declarations: [NewEmployeeComponent]
})
export class NewEmployeeModule {}
