import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {

  name:any ='test';
  contact:any='9638527418';
  email:any="abc@gmail.com";
  role:any;
  constructor() { }

  ngOnInit() {
  }

}
