import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from 'angular2-datatable';
import { ToasterModule } from 'angular2-toaster';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { GenerateInvoiceComponent } from './generate-invoice.component';
import { GenerateInvoiceRoutingModule } from './generate-invoice-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SelectModule} from 'ng-select';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    GenerateInvoiceRoutingModule,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    Ng2Bs3ModalModule,
    SharedModule,
    SelectModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ GenerateInvoiceComponent ]
})
export class GenerateInvoiceModule { }
