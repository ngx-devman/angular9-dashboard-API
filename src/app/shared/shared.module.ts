import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal';

import { FlotDirective } from './directives/flot/flot.directive';
import { SparklineDirective } from './directives/sparkline/sparkline.directive';
import { EasypiechartDirective } from './directives/easypiechart/easypiechart.directive';
import { ColorsService } from './colors/colors.service';
import { UserService } from './users/user.service';
import { CheckallDirective } from './directives/checkall/checkall.directive';
import { VectormapDirective } from './directives/vectormap/vectormap.directive';
import { NowDirective } from './directives/now/now.directive';
import { ScrollableDirective } from './directives/scrollable/scrollable.directive';
import { JqcloudDirective } from './directives/jqcloud/jqcloud.directive';
import { StorageService } from '../shared/storage/storage.service';
import { ngxZendeskWebwidgetModule } from 'ngx-zendesk-webwidget';
import { ListTemplateComponent } from './components/list-template/list-template.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { ActivityTableComponent } from './components/activity-table/activity-table.component';
import { DataTableModule } from 'angular2-datatable';
import { DefaultModelComponent } from './components/default-model/default-model.component';
import { MatIconModule, MatInputModule, MatProgressSpinnerModule, MatTabsModule, MatCardModule, MatToolbarModule, MatRadioModule, MatMenuModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from 'ngx-mat-datetime-picker';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { MatButtonModule } from '@angular/material/button';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OwlNativeDateTimeModule, OwlDateTimeModule } from 'ng-pick-datetime';
import { CancelModalComponent } from './components/cancel-modal/cancel-modal.component';
import { VendorDisplayComponent } from './components/vendor-display/vendor-display.component';
import { ListingDetailsComponent } from './components/listing-details/listing-details.component';
import { SubCategoryCardComponent } from './components/sub-category-card/sub-category-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { IndividualProfileComponent } from './components/individual-profile/individual-profile.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { PageNavbarComponent } from './page-navbar/page-navbar.component';
import { BuyBlueTagsModalComponent } from './components/buy-blue-tags-modal/buy-blue-tags-modal.component';


// https://angular.io/styleguide#!#04-10
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        CarouselModule.forRoot(),
        CollapseModule.forRoot(),
        DatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        ProgressbarModule.forRoot(),
        RatingModule.forRoot(),
        TabsModule.forRoot(),
        TimepickerModule.forRoot(),
        TooltipModule.forRoot(),
        TypeaheadModule.forRoot(),
        ToasterModule,
        DataTableModule,
        RouterModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        MatButtonModule,
        MatAutocompleteModule,
        NgSelectModule,
        MatTooltipModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatCardModule,
        MatToolbarModule,
        MatRadioModule,
        MatMenuModule,
        Ng2Bs3ModalModule
    ],
    providers: [
        ColorsService,
        UserService
    ],
    declarations: [
        FlotDirective,
        SparklineDirective,
        EasypiechartDirective,
        CheckallDirective,
        VectormapDirective,
        NowDirective,
        ScrollableDirective,
        JqcloudDirective,
        ListTemplateComponent,
        ListTableComponent,
        ActivityTableComponent,
        DefaultModelComponent,
        BackButtonComponent,
        AutoCompleteComponent,
        CancelModalComponent,
        VendorDisplayComponent,
        ListingDetailsComponent,
        SubCategoryCardComponent,
        LoadingComponent,
        IndividualProfileComponent,
        PermissionsComponent,
        PageNavbarComponent,
        BuyBlueTagsModalComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        RouterModule,
        AccordionModule,
        AlertModule,
        ButtonsModule,
        CarouselModule,
        CollapseModule,
        DatepickerModule,
        BsDropdownModule,
        ModalModule,
        PaginationModule,
        ProgressbarModule,
        RatingModule,
        TabsModule,
        TimepickerModule,
        TooltipModule,
        TypeaheadModule,
        ToasterModule,
        FlotDirective,
        SparklineDirective,
        EasypiechartDirective,
        CheckallDirective,
        VectormapDirective,
        NowDirective,
        ScrollableDirective,
        JqcloudDirective,
        ngxZendeskWebwidgetModule,
        ListTemplateComponent,
        DefaultModelComponent,
        BackButtonComponent,
        AutoCompleteComponent,
        CancelModalComponent,
        VendorDisplayComponent,
        LoadingComponent,
        IndividualProfileComponent,
        PageNavbarComponent,
        BuyBlueTagsModalComponent
    ],
    entryComponents: [DefaultModelComponent, CancelModalComponent]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
