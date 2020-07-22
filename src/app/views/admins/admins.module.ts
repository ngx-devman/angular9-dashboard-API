import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from 'angular2-datatable';
import { ToasterModule } from 'angular2-toaster';
// import { GroupComponent } from './group.component';
// import { GroupRoutingModule } from './group-routing.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal';
// import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AdminsRoutingModule } from './admins-routing.module';
import { AdminsComponent } from './admins.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
     AdminsRoutingModule,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    BsDropdownModule,
    Ng2Bs3ModalModule,
    SharedModule,
    // CommonModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ AdminsComponent ]
})
export class AdminsModule { }   
        