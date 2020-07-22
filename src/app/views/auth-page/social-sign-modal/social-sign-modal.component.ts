import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { isThisSecond } from 'date-fns';
import { ApiProvider } from '../../../service/api';
import { AlertService } from '../../../service/alert.service';
import { TermsModalComponent } from '../terms-modal/terms-modal.component';

@Component({
  selector: 'app-social-sign-modal',
  templateUrl: './social-sign-modal.component.html',
  styleUrls: ['./social-sign-modal.component.scss']
})
export class SocialSignModalComponent implements OnInit {
  
  signupForm: FormGroup;
  industryData: any;
  agreeBtTitle = "Agree with terms of use and privacy";
  phoneMask = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];
  agreeCheckValue: boolean;
  shareAgreed: boolean;
  constructor(
    public dialogRef: MatDialogRef<SocialSignModalComponent>,
    public apiProvider: ApiProvider,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private alertService: AlertService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit() {
    console.log('this is injected data: ', this.data)
    this.shareAgreed = false;
    this.industryData = this.data.industryData;
    this.initilaizeForm();
  }

  initilaizeForm() {
    this.signupForm = this.formBuilder.group({
      phone: ['', Validators.required],
      industryId: ['', Validators.required],
      companyName: ['', Validators.required]
    })
  }

  get formController() {
    return this.signupForm.controls
  }

  shareAgreedSocial() {
    this.shareAgreed = true;
  }

  removeAlert(): void {
    this.dialogRef.close({event:'close', success: false, res:'this.fromDialog'});
  }

  onAgreeTerm() {
    this.dialog.open(TermsModalComponent, {
      height: '90vh',
      width: '500px'
    });
  }

  AgreecheckboxChange(ev) {
    console.log(ev.currentTarget.checked, this.signupForm.valid)
    this.agreeCheckValue = ev.currentTarget.checked
  }
  AgreecheckboxChange2(ev) {
  }

  normalSignUp($ev, value: any) {
    $ev.preventDefault();
    console.log('value', value);
    let signUpValues = {companyPhone: this.signupForm.value.phone, ...this.signupForm.value};
    const userData = {
      ...this.data.userData,
      ...signUpValues
    }

    console.log('thisis user data: ', userData);

    this.apiProvider.signUpSocial(userData)
      .subscribe(res => {
        console.log('social signup: ', res)
        if (res["status"] == "1") {
          this.dialogRef.close({event:'close', success: true, res: res});
          this.alertService.success('This account is registered successfully');
        }
        if (res["status"] == "0") {
          this.dialogRef.close({event:'close', success: false, res: {message: res["message"]}});
          this.alertService.warn(res["message"]);
        }
      }),
      error => {
        console.log('social signup err: ', error)
        this.alertService.error('Error on http request!');
      };
  }
  
}