import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { DataTableModule } from "angular2-datatable";
import { ToasterModule } from "angular2-toaster";
import { Ng2Bs3ModalModule } from "ng2-bs3-modal/ng2-bs3-modal";
import { SharedModule } from "../../shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import { VendorsComponent } from './vendors/vendors.component';
import { EmployeersComponent } from './employeers/employeers.component';
import { MatIconModule } from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SharedCpnModule } from '../../components/shared-cpn.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    Ng2Bs3ModalModule,
    SharedModule,
    SharedCpnModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),

    MatCardModule,
    MatRippleModule,
    MatIconModule,

    DragDropModule,
  ],
  declarations: [AdminComponent, VendorsComponent, EmployeersComponent]
})
export class AdminModule {}
