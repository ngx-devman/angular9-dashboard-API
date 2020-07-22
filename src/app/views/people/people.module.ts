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
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
     PeopleRoutingModule,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    BsDropdownModule,
    Ng2Bs3ModalModule,
    SharedModule,
    // CommonModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ PeopleComponent ]
})
export class PeopleModule { }   
        