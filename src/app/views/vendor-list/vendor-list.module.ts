import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorListRoutingModule } from './vendor-routing.module';
import { SharedModule } from '../../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { VendorModalComponent } from './vendor-list/vendor-modal/vendor-modal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';


@NgModule({
  declarations: [VendorListComponent, VendorModalComponent],
  imports: [
    CommonModule,
    VendorListRoutingModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule
  ],
  entryComponents: [VendorModalComponent]
})
export class VendorListModule { }
