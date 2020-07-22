import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { MatIconModule } from "@angular/material";
import { DataTableModule } from "angular2-datatable";
import { ToasterModule } from "angular2-toaster";
import { CustomerViewRoutingModule } from "./customer-view-routing.module";
import { Ng2Bs3ModalModule } from "ng2-bs3-modal";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from "../../shared/shared.module";
import { CustomerViewComponent } from "./customer-view.component";

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CustomerViewRoutingModule,

    ChartsModule,
    DataTableModule,
    ToasterModule,
    MatTooltipModule,
    MatIconModule,
    BsDropdownModule,
    Ng2Bs3ModalModule,
    SharedModule,
    ButtonsModule.forRoot(),
  ],
  declarations: [CustomerViewComponent],
})
export class CustomerViewModule {}
