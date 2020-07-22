import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { TextMaskModule } from "angular2-text-mask";
import { ToasterModule, ToasterService } from "angular2-toaster";
import { ModalModule } from "ngx-bootstrap/modal";

import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule, MatInputModule, MatIconModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { MatButtonModule } from "@angular/material/button";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule
} from "@coreui/angular";
import { ApiProvider } from '../../service/api';
import { TranslatePipe } from '@ngx-translate/core';

import { AlertService } from '../../service/alert.service';

import { NgxSpinnerModule } from "ngx-spinner";
import { SharedCpnModule } from '../../components/shared-cpn.module';
import { AgreedTermModalComponent } from './agreed-term-modal/agreed-term-modal.component';
import { AuthPageModule } from '../auth-page/auth-page.module';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("767956916860-kkqvsqniunrhal5j5gco8njs6d0u7t1i.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("490466604947035")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    LoginComponent,
    AgreedTermModalComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    TextMaskModule,
    ToasterModule,
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,

    BsDropdownModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ModalModule.forRoot(),

    NgxSpinnerModule,
    SharedCpnModule,

    AuthPageModule
  ],
  providers: [
    ToasterService,
    ApiProvider,
    TranslatePipe,
    AlertService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
  ],
  entryComponents: [
    AgreedTermModalComponent
  ]
})
export class LoginModule { }
