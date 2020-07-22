import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from 'angular2-datatable';
import { ToasterModule } from 'angular2-toaster';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal';
import { SharedModule } from '../../shared/shared.module';


import {ManagerGroupComponent}from './manager-group.component';
import {ManagerGroupRoutingModule} from './manager-group-routing.module';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ManagerGroupRoutingModule,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    BsDropdownModule,
    Ng2Bs3ModalModule,
    SharedModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ ManagerGroupComponent]
})
export class ManagerGroupModule { }
