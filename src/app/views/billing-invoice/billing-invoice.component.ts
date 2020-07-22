import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-billing-invoice',
  templateUrl: './billing-invoice.component.html',
  styleUrls: ['./billing-invoice.component.scss']
})
export class BillingInvoiceComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  goBack() {
    this.location.back();
  }
}
