import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { DataTableModule } from "angular2-datatable";
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    ChartsModule,
    DataTableModule,
    BsDropdownModule,
    ToasterModule,
    BrowserModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ UserComponent ]
})
export class UserJSModule { }
