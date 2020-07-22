import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from 'angular2-datatable';
import { ToasterModule } from 'angular2-toaster';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharedModule } from '../../../shared/shared.module';
import { NewUserRoutingModule } from './new-user-routing.module';
import { NewUserComponent } from './new-user.component';
import { CdkStep } from '@angular/cdk/stepper';
import { MatStepper, MatStepperModule, MatInputModule,MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NewUserRoutingModule,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    Ng2Bs3ModalModule,
    SharedModule,
    BsDropdownModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ NewUserComponent ]
})
export class NewUserModule { }
