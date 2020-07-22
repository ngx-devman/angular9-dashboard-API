import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { DataTableModule } from "angular2-datatable";
import { Ng2TableModule } from "ng2-table/ng2-table";
// import { AgGridModule } from 'ag-grid-angular/main';
import { ToasterModule } from "angular2-toaster";
import { SelectModule } from "ng-select";

import { SharedModule } from "../../shared/shared.module";
import { Ng2Bs3ModalModule } from "ng2-bs3-modal/ng2-bs3-modal";
import { FullCalendarModule } from "@fullcalendar/angular";
import { UserService } from "../../shared/users/user.service";
import { StorageService } from "../../shared/storage/storage.service";

import { CKEditorModule } from "ng2-ckeditor";
import { GymComponent } from "../gym/gym.component";
//import { GroupComponent } from "../group/group.component";
//import { UserComponent } from "../user/user.component";
// import { EquipmentComponent } from "../equipment/equipment.component";
//import { BrandComponent } from "../brand/brand.component";
//import { TypeComponent } from "../type/type.component";

import { GroupEquipmentComponent } from "../group-equipment/group-equipment.component";
import { ReportComponent } from "../report/report.component";
import { AgmCoreModule } from "@agm/core";
//import { ManagerComponent } from "../manager/manager.component";
import { EquipmentExerciseComponent } from "../equipment-exercise/equipment-exercise.component";
//import { TechComponent } from "../tech/tech.component";
//import { TechManagerComponent } from "../tech-manager/tech-manager.component";
import { TechstuffComponent } from "../techstuff/techstuff.component";
import { ActionStuffComponent } from "../action-stuff/action-stuff.component";
import { DataEntryComponent } from "../data-entry/data-entry.component";
//import { EmailScheduleComponent } from "../email-schedule/email-schedule.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

import { GroupManagerComponent } from "../group-manager/group-manager.component";
import { RoleTechinicianListComponent } from '../role-techinician-list/role-techinician-list.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { BillingComponent } from '../billing/billing.component';
import { TaginvoiceComponent } from '../taginvoice/taginvoice.component';
import { BillingHistoryComponent } from '../billing-history/billing-history.component';
import { BillingInvoiceComponent } from '../billing-invoice/billing-invoice.component';
import { GroupTechnicianListComponent } from '../group-technician-list/group-technician-list.component';
import { RolemanagerlistComponent } from '../rolemanagerlist/rolemanagerlist.component';
import { GroupInventoryListComponent } from '../group-inventory-list/group-inventory-list.component';
import {ViewGroupTechnicianComponent} from '../view-group-technician/view-group-technician.component';
import { BillingMethodComponent } from '../billing-method/billing-method.component';
import { CompanyEquipmentComponent } from '../company-equipment/company-equipment.component';
import { InventoryMoreComponent } from '../inventory-more/inventory-more.component';
import { SubscriptionComponent } from '../subscription/subscription.component';
import { MatIconModule, MatRippleModule } from '@angular/material';
//import { SubscribeUserComponent } from '../subscribe-user/subscribe-user.component';
import {MatButtonModule} from '@angular/material/button';
import { SharedCpnModule } from '../../components/shared-cpn.module';

const routes: Routes = [
  // { path: "", redirectTo: "gym", pathMatch: "full" },
  // { path: "gym", component: GymComponent },
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  { path: "location", component: GymComponent },
 // { path: "gym-equipment", component: GymEquipmentComponent },
 // { path: "group", component: GroupComponent },
  { path: "group-equipment", component: GroupEquipmentComponent },
  { path: "group-manager", component: GroupManagerComponent },
  { path:"taginvoice", component: TaginvoiceComponent },
  //{ path: "user", component: UserComponent },
  // { path: "equipment", component: EquipmentComponent },
 // { path: "brand", component: BrandComponent },
 // { path: "type", component: TypeComponent },
  // { path: "report", component: ReportComponent },
  { path: "billing", component: BillingComponent },
  { path: "billinghistory", component: BillingHistoryComponent },
  { path: "billinginvoice", component: BillingInvoiceComponent },
  { path: "billingmethod", component: BillingMethodComponent },
  //{ path: "manager", component: ManagerComponent },
  { path: "viewreport", component: InvoiceComponent },
  { path: "equipment-exercise", component: EquipmentExerciseComponent },
  //{ path: "tech", component: TechComponent },
 // { path: "tech-manager", component: TechManagerComponent },
  { path: "techstuff", component: TechstuffComponent },
  { path: "action-stuff", component: ActionStuffComponent },
  { path: "data-entry", component: DataEntryComponent },
 // { path: "email-schedule", component: EmailScheduleComponent },
  {path:"roletechinicianlist",component:RoleTechinicianListComponent},
  {path:"grouptechnicianlist",component:GroupTechnicianListComponent},
  {path:"rolemanagerlist" , component: RolemanagerlistComponent},
  {path:"groupinventorylist" , component: GroupInventoryListComponent},
  {path:"viewgrouptechnician", component: ViewGroupTechnicianComponent},
  {path:"inventorydetails", component: InventoryMoreComponent},
  {path:"subscribeuser", component: SubscriptionComponent},
  // {path:"customerList", component: CustomerListComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    SelectModule,
    DataTableModule,
    CKEditorModule,
    Ng2TableModule,
    ToasterModule,
    Ng2Bs3ModalModule,
    FullCalendarModule,      
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDVpFdNVfFFFLgzn_V7Zch_ZzkUiyxdxuw"
    }),
    OwlDateTimeModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    SharedCpnModule
  ],
  declarations: [
    GymComponent,
   // GymEquipmentComponent,
    //GroupComponent,
  GroupEquipmentComponent,
  GroupManagerComponent,
  GroupTechnicianListComponent,
  InvoiceComponent,
  TaginvoiceComponent,
  BillingComponent,
  BillingHistoryComponent,
  BillingInvoiceComponent,
  BillingMethodComponent,
    //UserComponent,
    // EquipmentComponent,
  // ReportComponent,
//  BrandComponent,
  //TypeComponent,
  //ManagerComponent,
  EquipmentExerciseComponent,
  //TechManagerComponent,
  //TechComponent,
  TechstuffComponent,
  ActionStuffComponent,
  DataEntryComponent,
  //EmailScheduleComponent,
  RoleTechinicianListComponent,
  RolemanagerlistComponent,
  GroupInventoryListComponent,
  ViewGroupTechnicianComponent,
  InventoryMoreComponent,
  SubscriptionComponent
  //SubscribeUserComponent
  // CustomerListComponent
  ],
  providers: [UserService, StorageService],
  exports: [RouterModule]
})
export class HomeModule {
  constructor(private userInfo: UserService, private router: Router) {
    let type = this.userInfo.getUserInfo("type");
    if (type == 1) {
     router.navigate(["/dashboard"]);
      // router.navigate(["/manufacture"]);
      return;
    } else if (type == 2) {
    // router.navigate(["/dashboard"]);
      router.navigate(["/gym"]);
      return;
    }
  }
}
