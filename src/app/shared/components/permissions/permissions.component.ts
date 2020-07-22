import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  @Input() permissions;
  @Input() userType;
  @Input() tableHead;
  @Input() viewUser;
  
  constructor() { 
  }

  ngOnInit() {
  }



}

