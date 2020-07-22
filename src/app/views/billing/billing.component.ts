import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  valForm2: FormGroup;

  toasterService: ToasterService;
  history = [
    { name: "Billing Methods", click: "/main/billingmethod", i: "money", color: '#49b8ff' },
    { name: "History", click: "/main/billinghistory", i: "history", color: '#0082c3' },
    { name: "Subscriptions", click: "/main/subscribeuser", i: "subscriptions", color: '#713bdb' },
  ]
  constructor(private location: Location, public router: Router) { }

  ngOnInit() {
    this.history.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
  navigate(url) {
    // window.location.href=url;
    this.router.navigate([url]);
  }
  goBack() {
    this.location.back();
  }
}
