import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/users/user.service';

@Component({
  selector: 'app-view-user-info',
  templateUrl: './view-user-info.component.html',
  styleUrls: ['./view-user-info.component.scss']
})
export class ViewUserInfoComponent implements OnInit {
  userInfo:any;
  userName:any;
  permissions=[
    {name:'1'},
    {name:'2'},
    {name:'3'},
    {name:'4'},
    {name:'5'},

  ]
  constructor(public router:Router,public route:ActivatedRoute,  private userinfo: UserService,) {
    this.userinfo.userData.subscribe(data =>{
      console.log("data",data)
      this.userInfo= JSON.parse(data['user']);
      this.userName=data['userName']
      console.log(this.userName);
      console.log(this.userInfo)
  })
}
  //   this.userInfo= JSON.parse(this.route.snapshot.queryParams['item']);
  //   console.log('userInfo',this.userInfo)
  //  }

  ngOnInit() {
  }

}
