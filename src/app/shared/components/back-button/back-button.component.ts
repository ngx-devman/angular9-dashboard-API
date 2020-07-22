import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  @Input() backRoute = '';
  @Input() toLastPage: boolean;

  constructor(private router:Router, private _location: Location) {}

  ngOnInit() {
  }

  goBack() {
    this.toLastPage
      ? this._location.back()
      : this.router.navigate([this.backRoute]);
  }
}
