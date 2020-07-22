import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  vendorTypes = [
    {name: 'Add Vendor', color: '#0483c3', type: 'add', i: 'person'},
    {name: 'View Vendor', color: 'green', type: 'view', i: 'person'}
  ]
  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  goVendorType(type: string) {
    if(type === 'add') {
      this.router.navigate(['newuser']);
    } else {
      this.router.navigate(['vendors'])
    }
  }

  goBack() {
    this.location.back();
  }
}
