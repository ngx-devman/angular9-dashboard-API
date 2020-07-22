import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vendor-display',
  templateUrl: './vendor-display.component.html',
  styleUrls: ['./vendor-display.component.scss']
})
export class VendorDisplayComponent implements OnInit {

  constructor() { }
  @Input() searchedUser:any;
  ngOnInit() {
  }

}
