import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from 'angular2-datatable';
import { ToasterModule } from 'angular2-toaster';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal';
import { SharedModule } from '../../../shared/shared.module';

import { BuyTagComponent } from './buytag.component';
import { BuyTagRoutingModule } from  './buytag-routing.module';



@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    BsDropdownModule,
    Ng2Bs3ModalModule,
    SharedModule,
    BuyTagRoutingModule,
   
    ButtonsModule.forRoot()
  ],
  declarations: [ BuyTagComponent ]
})
export class  BuytagModule{ }
            