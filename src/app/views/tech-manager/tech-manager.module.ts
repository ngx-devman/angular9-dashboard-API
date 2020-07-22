import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from "angular2-datatable";
import { Ng2TableModule } from "ng2-table/ng2-table";
import { CommonModule } from '@angular/common';
//import { AgGridModule } from 'ag-grid-angular/main';
import { ToasterModule } from 'angular2-toaster';
import { SelectModule } from 'ng-select';
import { TechManagerComponent } from './tech-manager.component';
import { TechManagerRoutingModule } from './tech-manager-routing.module';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TechManagerRoutingModule,
    ChartsModule,
    BsDropdownModule,
    DataTableModule,
    SelectModule,
    ToasterModule,
    Ng2TableModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ TechManagerComponent ]
})
export class TechManagerModule { }
