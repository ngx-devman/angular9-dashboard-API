import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponentComponent } from './alert-component/alert-component.component';
import { MatIconModule, MatRippleModule } from '@angular/material';
import { AdminCardComponent } from './admin-card/admin-card.component';



@NgModule({
  declarations: [
    AlertComponentComponent,
    AdminCardComponent
  ],
  imports: [
    CommonModule,

    MatIconModule,
    MatRippleModule
  ],
  entryComponents: [
    AlertComponentComponent
  ],
  exports: [
    AlertComponentComponent,
    AdminCardComponent
  ]
})
export class SharedCpnModule { }
