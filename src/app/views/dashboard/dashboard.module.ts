import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { ChartsModule } from "ng2-charts";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [DashboardRoutingModule, CommonModule, ChartsModule, MatDialogModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {}
