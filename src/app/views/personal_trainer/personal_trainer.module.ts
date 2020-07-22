import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { DataTableModule } from 'angular2-datatable';
import { Ng2TableModule } from 'ng2-table/ng2-table';
//import { AgGridModule } from 'ag-grid-angular/main';
import { ToasterModule } from 'angular2-toaster';
import { SelectModule } from 'ng-select';

import { SharedModule } from '../../shared/shared.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FullCalendarModule } from '@fullcalendar/angular';

import { UserService } from '../../shared/users/user.service';
import { StorageService } from '../../shared/storage/storage.service';

//import { DateTimeInputComponent } from 'app/components/date-time-input/date-time-input.component';

import { GymComponent } from '../../views/gym/gym.component';
import { UserComponent } from '../../views/user/user.component';
import { PersonalTrainerComponent } from './trainer/personal_trainer.component';
import { PersonalTrainerClientComponent } from './client/personal_trainer_client.component';

const routes: Routes = [
    { path: '', redirectTo: 'ptrainer', pathMatch: 'full'},
    { path: 'ptrainer', component: PersonalTrainerComponent },
    { path: 'personal_trainer_client', component: PersonalTrainerClientComponent },
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        SelectModule,
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
        PersonalTrainerComponent,
        PersonalTrainerClientComponent
    ],
    providers: [UserService, StorageService],
    exports: [
        RouterModule
    ]
})
export class PersonalTrainerModule {
    constructor(private userInfo: UserService, private router: Router) {
        let type = this.userInfo.getUserInfo('type');
        // if(type == 1) {
        //     router.navigate(['/manufacture']);
        //     return;
        // } else if(type == 2) {
        //     router.navigate(['/gym']);
        //     return;
        // }
    }
}
