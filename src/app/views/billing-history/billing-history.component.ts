import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-billing-history',
  templateUrl: './billing-history.component.html',
  styleUrls: ['./billing-history.component.scss']
})
export class BillingHistoryComponent implements OnInit {
  Invoices:any
  constructor( private router: Router,private location: Location) { }

  ngOnInit() {
  }
  showReport(){
        this.router.navigate(['/main/billinginvoice']);
    }
  goBack() {
    this.location.back();
  }
}
