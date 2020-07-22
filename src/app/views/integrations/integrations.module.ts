import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntegrationsComponent } from './integrations.component';
import { IntegrationsRoutingModule } from './integrations.routing.module';
import { ToasterModule } from 'angular2-toaster';
// child components
import { QuickbooksComponent } from './quickbooks/quickbooks.component';



@NgModule({
  declarations: [IntegrationsComponent, QuickbooksComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    IntegrationsRoutingModule,
    ToasterModule
  ]
})
export class IntegrationsModule { }
