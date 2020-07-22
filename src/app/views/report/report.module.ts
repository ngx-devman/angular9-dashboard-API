import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { DataTableModule } from "angular2-datatable";
import { ToasterModule } from "angular2-toaster";
import { Ng2Bs3ModalModule } from "ng2-bs3-modal/ng2-bs3-modal";
import { ReportComponent } from "./report.component";
import { ReportRoutingModule } from "./report-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ReportRoutingModule,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    Ng2Bs3ModalModule,
    SharedModule,
    BsDropdownModule,

    MatIconModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ReportComponent],
  exports: [ReportComponent]
})
export class ReportModule {}
