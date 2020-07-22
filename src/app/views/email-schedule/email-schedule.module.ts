import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from 'angular2-datatable';
import { CKEditorModule } from "ng2-ckeditor";
import { ToasterModule } from 'angular2-toaster';
import { EmailScheduleComponent } from './email-schedule.component';
import { EmailScheduleRoutingModule } from './email-schedule-routing.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EmailScheduleRoutingModule,
    ChartsModule,
    CKEditorModule,
    DataTableModule,
    ToasterModule,
    BsDropdownModule,
    Ng2Bs3ModalModule,
    SharedModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ EmailScheduleComponent ]
})
export class EmailScheduleModule { }
