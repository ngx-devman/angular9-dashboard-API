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
import { AppSidebarModule } from '@coreui/angular';
import {  MatSidenavModule,MatSliderModule,MatSlideToggleModule,   MatToolbarModule,MatIconModule,MatListModule, MatTabsModule,MatMenuModule} from '@angular/material';
import {SidebarModule} from 'ng-sidebar';
import { ViewUserInfoRoutingModule } from './view-user-info-routing.module';
import { ViewUserInfoComponent } from './view-user-info.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ViewUserInfoRoutingModule,
    ChartsModule,
    DataTableModule,
    ToasterModule,
    Ng2Bs3ModalModule,
    SharedModule,
    SelectModule,
    BsDropdownModule,
    AppSidebarModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
  MatMenuModule,
 
    ButtonsModule.forRoot(),
    SidebarModule
  ],
  declarations: [ ViewUserInfoComponent ]
})
export class ViewUserInfoModule { }
