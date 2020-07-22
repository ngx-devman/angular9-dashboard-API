import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from 'angular2-datatable';
import { ToasterModule } from 'angular2-toaster';
import { SharedModule } from '../../shared/shared.module';

import { BuyTagComponent } from './buytag.component';
import { BuyTagRoutingModule } from './buytag-routing.module';
import { BuytagMainComponent } from './buytag-main/buytag-main.component';
import { BuytagDetailComponent } from './buytag-detail/buytag-detail.component';



@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    BsDropdownModule,
    SharedModule,
    BuyTagRoutingModule,

    ButtonsModule.forRoot()
  ],
  declarations: [BuyTagComponent, BuytagMainComponent, BuytagDetailComponent]
})
export class BuytagModule { }
