import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";
import { DataTableModule } from "angular2-datatable";
import { ToasterModule } from "angular2-toaster";
import { NewCustomerRoutingModule } from "./new-customer-routing.module";
import { NewCustomerComponent } from "./new-customer.component";
import { Ng2Bs3ModalModule } from "ng2-bs3-modal";
import { SharedModule } from "../../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NewCustomerRoutingModule,

    ChartsModule,
    DataTableModule,
    ToasterModule,
    BsDropdownModule,
    Ng2Bs3ModalModule,
    SharedModule,
    ButtonsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCih6AZmiTGOe8N0lJXfIL7y8FXOXzJd7w' ,//'AIzaSyASyYRBZmULmrmw_P9kgr7_266OhFNinPA',
      libraries: ["places"]
      // To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app
    })
  ],
  declarations: [NewCustomerComponent]
})
export class NewCustomerModule {}

