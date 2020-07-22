import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/users/user.service';
import { JsonFormatter } from 'tslint/lib/formatters';

@Component({
  selector: 'app-view-new-user',
  templateUrl: './view-new-user.component.html',
  styleUrls: ['./view-new-user.component.scss']
})
export class ViewNewUserComponent implements OnInit {
 user=[
   {id :1,name:'test',date:'11/12/2019',email:'test@gmail.com',contact:'96385274111',address:'kolhapur'},
   {id :1,name:'Abc',date:'21/12/2019',email:'abc@gmail.com',contact:'7894561236',address:'kolhapur'},
   {id :1,name:'Joy',date:'21/12/2019',email:'joy@gmail.com',contact:'9653214587',address:'kolhapur'},
 ]
 userinfo:any;
  constructor(public router:Router,private userInfo: UserService,) { }

  ngOnInit() {
  }
  viewMore(item){
    console.log("item",item)
    let userid=item['id'];
    console.log("user idddd",userid)
    let userName= item['name'];
    this.userinfo={'id':userid,'userName':userName,"user":JSON.stringify(item)};
    this.userInfo.UserName(this.userinfo)
    console.log("userInfo11",this.userinfo)
    this.router.navigate(['/viewuserinfo',userName]);
    // this.router.navigate(['/main/viewUserInfo'],{queryParams:{"item": JSON.stringify(this.userinfo)}, skipLocationChange: true});
  }

}
