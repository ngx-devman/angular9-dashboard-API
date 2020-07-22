import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/users/user.service';

@Component({
  selector: 'app-outside-user',
  templateUrl: './outside-user.component.html',
  styleUrls: ['./outside-user.component.scss']
})
export class OutsideUserComponent implements OnInit {
// userEmail=[
//   {id:1,email:'abc@getMaxListeners.com'},
//   {id:2,email:'test@getMaxListeners.com'},
//   {id:3,email:'abc111@getMaxListeners.com'}
// ]
 user=[
  {id:1,name:'test',date:'11/12/2019',email:'test@gmail.com',contact:'96385274111',address:'kolhapur'},
]
organization=[
  {id:'1',name:'Web'},
  {id:'2',name:'Dev'},
];
id:any;
email
org:any;
email_Id:any;
userinfo:any;
userEmailList:any=[];
  constructor(public router:Router,public userInfo:UserService) { 
   
  }

  ngOnInit() {
  }


  addUser($event){

  }

  selectUser(name){
    console.log("id",id)
    var id = this.user.find(x => x.email == name);
    this.email=id
    console.log("emial",this.email)
    this.email_Id = id.id;
    console.log(this.email_Id);
   if(this.email_Id ==1)
   {
     this.org= 'web'
   }else{
    this.org= 'dev'
   }
  }
  addPermissions($event){

  }

  selectPermissions(){
   
  }
  goToUser(){
    this.router.navigate(['/main/authorisedUser']);
  }
  goToInvite(){
    this.router.navigate(['/main/inventUser']);
  }
  addNewUser(){
    console.log("hello")
    // let user=
    //   {id:1,name:'test',date:'11/12/2019',email:'test@gmail.com',contact:'96385274111',address:'kolhapur'}
    
    let userinfo= {'id': 1,'userName': "test", 'user':JSON.stringify({ id:1,name:'test',date:'11/12/2019',email:'test@gmail.com',contact:'96385274111',address:'kolhapur'})};
    // this.userinfo= {"user":JSON.stringify(user)};
    console.log("userInfo11",userinfo)
    let userName= 'test'//userinfo.user.name;
    console.log("userName",userName)
    this.userInfo.UserName(userinfo);
    this.router.navigate(['/viewuserinfo',userName]);
    //this.router.navigate(['/main/viewUserInfo'],{queryParams:{"item": JSON.stringify(this.userinfo)}, skipLocationChange: true});
  }
}
