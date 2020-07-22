import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from 'angular2-datatable';
import { ToasterModule } from 'angular2-toaster';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharedModule } from '../../shared/shared.module';
import { OfficeAdminRouting } from './office-admin-routing.module';
import { OfficeAdminComponent } from './office-admin.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    OfficeAdminRouting,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    Ng2Bs3ModalModule,
    SharedModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ OfficeAdminComponent ]
})
export class OfficeAdminModule { }
