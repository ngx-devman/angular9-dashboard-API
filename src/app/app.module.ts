import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
//import { ModalComponent } from 'ng2-bs3-modal';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { PERFECT_SCROLLBAR_CONFIG } from "ngx-perfect-scrollbar";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { ToasterModule, ToasterService } from "angular2-toaster";
import { ToastrComponent } from "./toastr.component";
import { ToasterContainerComponent } from "angular2-toaster";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from "@angular/material/button";
import { TextMaskModule } from "angular2-text-mask";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Http } from "@angular/http";
import {
  TranslateService,
  TranslateModule,
  TranslateLoader
} from "@ngx-translate/core";
import { CKEditorModule } from "ng2-ckeditor";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from "./app.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { ModalsComponent } from "./modals.component";
// Import containers
import { DefaultLayoutComponent } from "./containers";

import { AccessComponent } from "./views/access/access.component";
import { RecoverComponent } from "./views/recover/recover.component";
import {
  ngxZendeskWebwidgetModule,
  ngxZendeskWebwidgetConfig
} from "ngx-zendesk-webwidget";
import { ApiProvider } from "./service/api";
// <<<<<<< HEAD
import { DragDropModule } from "@angular/cdk/drag-drop";
// =======
// >>>>>>> f545aec7c828cca1c5bbf390e9f5db75b928f1b6
const APP_CONTAINERS = [DefaultLayoutComponent];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
} from "@coreui/angular";

// Import routing module
import { AppRoutingModule } from "./app.routing";

// Import 3rd party components
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TabsModule } from "ngx-bootstrap/tabs";
import { ChartsModule } from "ng2-charts";
// import {AvatarModule} from 'ngx-avatar'
import { CalendarComponent } from "./components/calendar/calendar.component";
import { HttpModule } from "@angular/http";
import { CustomerComponent } from "./views/customer/customer.component";
import { EmailScheduleComponent } from "./views/email-schedule/email-schedule.component";

import { DragulaModule } from "ng2-dragula";
import { MatIconModule } from '@angular/material/icon';
import { AddNewUserComponent } from './views/add-new-user/add-new-user.component';
import { CustomWorkReportComponent } from './views/custom-work-report/custom-work-report.component';
import { DeleteUserComponent } from './views/delete-user/delete-user.component';
import { InviteUserComponent } from './views/invite-user/invite-user.component';
import { OutsideUserComponent } from './views/outside-user/outside-user.component';
import { ViewAuthorizedUserComponent } from './views/view-authorized-user/view-authorized-user.component';
import { DataTableModule } from 'angular2-datatable';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { SharedModule } from './shared/shared.module';

//import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
// https://github.com/ocombe/ng2-translate/issues/218

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
export class ZendeskConfig extends ngxZendeskWebwidgetConfig {
  accountUrl = "app.blueclerk.zendesk.com";
  beforePageLoad(zE) {
    zE.setLocale("en");
    zE.hide();
  }
}
@NgModule({
  imports: [
    BrowserModule,
    ngxZendeskWebwidgetModule.forRoot(ZendeskConfig),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    TextMaskModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ToasterModule,
    // AvatarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CKEditorModule,
    DragDropModule,
    DragulaModule,
    DataTableModule,
    Ng2Bs3ModalModule,
    SharedModule,
    ModalModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    })
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    //CustomerComponent,
    AccessComponent,
    CalendarComponent,
    //ModalComponent,
    ModalsComponent,
    //ToastrComponent,
    RecoverComponent,
    AddNewUserComponent,
    CustomWorkReportComponent,
    DeleteUserComponent,
    InviteUserComponent,
    OutsideUserComponent,
    ViewAuthorizedUserComponent
  ],
  providers: [
    ApiProvider,
    ToasterService,
    TranslatePipe, /*,{ 
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }*/
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
