import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from 'angular2-datatable';
import { ToasterModule } from 'angular2-toaster';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { SharedModule } from '../../shared/shared.module';
import { SelectModule} from 'ng-select';
import { CustomerListComponent } from './customer-list.component';
import {CustomerListRoutingModule} from'./customer-list-routing';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CustomerListRoutingModule,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    Ng2Bs3ModalModule,
    SharedModule,
    SelectModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ CustomerListComponent ]
})
export class CustomerListModule { }


