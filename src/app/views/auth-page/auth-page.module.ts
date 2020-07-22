import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import { AuthPageRoutingModule } from './auth-page-routing.module';
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

import { SocialSignModalComponent } from './social-sign-modal/social-sign-modal.component';
import { AlertService } from '../../service/alert.service';
import { TermsModalComponent } from './terms-modal/terms-modal.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedCpnModule } from '../../components/shared-cpn.module';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    // vasily account
    // provider: new GoogleLoginProvider("401795943055-pesot94ifij5uqn6ein62eb8fqibhqc5.apps.googleusercontent.com")
    // cris account
    // provider: new GoogleLoginProvider("954544994095-l6anfal7e23l6iq7q7mp1m6dr2qbvbeq.apps.googleusercontent.com")
    // provider: new GoogleLoginProvider("767956916860-h1sjf744g97qs4sccnrd6neaf7s39r2e.apps.googleusercontent.com")
    provider: new GoogleLoginProvider("767956916860-kkqvsqniunrhal5j5gco8njs6d0u7t1i.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    // vasily account
    // provider: new FacebookLoginProvider("328571748028097")
    // cris account
    provider: new FacebookLoginProvider("490466604947035")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AuthPageComponent, 
    SocialSignModalComponent,
    TermsModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthPageRoutingModule,
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

    SharedCpnModule
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
    SocialSignModalComponent,
    TermsModalComponent
  ],
  exports: [
    TermsModalComponent
  ]
})
export class AuthPageModule { }
