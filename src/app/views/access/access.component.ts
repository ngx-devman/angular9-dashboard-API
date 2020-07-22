
import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ColorsService } from '../../shared/colors/colors.service';
import { Router } from '@angular/router';
import 'sweetalert2/src/sweetalert2.scss';

@Component({
    selector: 'access',
    templateUrl: './access.component.html',
    styleUrls: ['./access.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AccessComponent {
    constructor(
        public colors: ColorsService,
        public http: HttpClient,
        private router: Router,
    ) {
    }
    goToLogin() {
        this.router.navigate(['/login']);
    }
 
}