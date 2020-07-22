import { Component, OnInit } from '@angular/core';
//import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { EnvVariables } from '../../service/env-variables';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ApiProvider } from '../../service/api';

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

    valForm: FormGroup;
    errText: any = '';

    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
      });

    constructor(
        //public settings: SettingsService,
        fb: FormBuilder,
        private http: Http,
        private router: Router,
        private mdToast: ToasterService,
        private api: ApiProvider
    ) {
        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])]
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            //this.sendLink(value.email);
            let body = { email: value.email };
            this.api.forgotPassword(body).subscribe(data=>{
                    debugger;
                console.log("@@@@@@@@@@@@@@");   
                console.log(data);
                if(data['status'] == 0){
                    this.toast(data['message'], "error");
                }else{
                    this.toast(data['message'], "success");
                }

            })
        }
    }

    sendLink(email) {
        let apiURL = EnvVariables.SERVER_ADDR + EnvVariables.SEND_RESET_URL;
        let body = {
            Email: email,
        };

        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });
        this.http.post(apiURL, body, options).subscribe(response => {
            let result = response.json();
            if (result.Success) {

                Swal.fire({
                    type: 'success',
                    title: 'Link sent successfully.  Please check your email.'
                })
            } else {
                this.errText = "Failed on send reset link!";
            }
        }, error => {
            this.errText = "Error on send http requset!";
        });
    }

    ngOnInit() {
    }

    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };

        this.mdToast.pop(toast); 
    }
}
