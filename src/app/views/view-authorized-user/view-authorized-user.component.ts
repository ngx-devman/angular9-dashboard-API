import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-authorized-user',
  templateUrl: './view-authorized-user.component.html',
  styleUrls: ['./view-authorized-user.component.scss']
})
export class ViewAuthorizedUserComponent implements OnInit {

  user=[
    {user:'test'},
    {user:'Abc'},
    {user:'Tester'}
  ]
  permissions=[
    {permission:'1'},
    {permission:'2'},
    {permission:'3'}
  ]

  constructor() { }

  ngOnInit() {
  }

  selectUser(){

  }
  addUser($event){

  }
}
