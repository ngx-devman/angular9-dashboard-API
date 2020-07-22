import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { DataTableModule } from 'angular2-datatable';
import { Ng2TableModule } from 'ng2-table/ng2-table';
//import { AgGridModule } from 'ag-grid-angular/main';
import { ToasterModule } from 'angular2-toaster';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '../../shared/shared.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FullCalendarModule } from "@fullcalendar/angular";

import { UserService } from '../../shared/users/user.service';
import { StorageService } from '../../shared/storage/storage.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { ProfileComponent } from './profile/profile.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'welcome', component: WelcomeComponent },
    { path: 'main', component: EquipmentComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'equipment_detail', component: EquipmentDetailComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        DataTableModule,
        Ng2TableModule,
        ToasterModule,
        Ng2Bs3ModalModule,
        FullCalendarModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDVpFdNVfFFFLgzn_V7Zch_ZzkUiyxdxuw'
        }),
    ],
    declarations: [
        WelcomeComponent,
        EquipmentComponent,
        ProfileComponent,
        EquipmentDetailComponent,
    ],
    providers: [UserService, StorageService],
    exports: [
        RouterModule
    ]
})
export class ManufactureModule {
    constructor(private userInfo: UserService, private router: Router) {
        let type = this.userInfo.getUserInfo('type');
        if(type == 0) {
            router.navigate(['/main']);
            return;
        } else if(type == 2) {
            router.navigate(['/location']);
            return;
        }
    }
}
