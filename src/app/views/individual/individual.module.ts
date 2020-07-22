import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualComponent } from './individual/individual.component';
import { IndividualRoutingModule } from './individual-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ToasterModule } from 'angular2-toaster';


@NgModule({
  declarations: [IndividualComponent],
  imports: [
    CommonModule,
    IndividualRoutingModule,
    SharedModule,
    ToasterModule
  ]
})
export class IndividualModule { }
