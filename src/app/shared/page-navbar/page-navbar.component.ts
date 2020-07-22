import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-navbar',
  templateUrl: './page-navbar.component.html',
  styleUrls: ['./page-navbar.component.scss']
})
export class PageNavbarComponent implements OnInit {

  @Input() navItems:any[] = [];
  @Output() itemedClicked = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  updateRoute(item:any, i:number){
    this.navItems.map(item => {
      item.active = false;
    });
    this.navItems[i].active = true;
    if(!item.clickAction){
      this.router.navigate([item.route]);
    } else {
      this.itemedClicked.emit(item);
    }
  }

}
