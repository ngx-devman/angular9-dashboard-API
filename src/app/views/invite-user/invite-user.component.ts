import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  goToUser(){
    this.router.navigate(["/main/outsideUser"])
  }
}
