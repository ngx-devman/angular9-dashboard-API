import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, UrlTree, UrlSegmentGroup, UrlSegment, PRIMARY_OUTLET } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';

import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { EnvVariables } from '../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
@Component({
    selector: 'app-generate-invoice',
    templateUrl: './generate-invoice.component.html',
    styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent {
    @ViewChild('equipmentDlg',{static:false}) equipmentDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    @ViewChild('fileInput',{static:false}) fileInput: ElementRef;
    @ViewChild('productImg',{static:false}) productImg: ElementRef;

    toasterService: ToasterService;
    Unitname:'';
    Unit:'';
    Work:''
    Work_Performed:'';
    Note:'';
    note:'';
    TechName:'';
    techname:'';
    Time:'';
    time:'';
    isDisplay=false;
    valForm1: FormGroup;
    
    constructor(
        public http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private mdToast: ToasterService,
        private location: Location,
        fb: FormBuilder,
        public dialog: MatDialog,
        toasterService: ToasterService,
    ) {
        this.toasterService = toasterService;
        this.valForm1 = fb.group({
            'Unit': [null, Validators.required],
            'Work_Performed': [null, Validators.required],
            'note': [null, Validators.required],
            'techname': [null, Validators.required],
            'time': [null, Validators.required],
        });
    }
    showReport(){
        this.router.navigate(['/main/viewreport']);
    }
    save(){
        this.isDisplay = true;
        this.Unit=this.Unitname;
        this.Work=this.Work_Performed;
        this.Note=this.note;
        this.TechName=this.techname;
        this.Time=this.time;
    }
    cancel(){
    this.isDisplay = false;
    }
    
}
