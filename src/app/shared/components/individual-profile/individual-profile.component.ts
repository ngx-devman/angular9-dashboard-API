import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiProvider } from '../../../service/api';
import { UserService } from '../../users/user.service';


@Component({
  selector: 'app-individual-profile',
  templateUrl: './individual-profile.component.html',
  styleUrls: ['./individual-profile.component.scss']
})
export class IndividualProfileComponent implements OnInit {

  constructor(private user:UserService) { }
  @Input() accountDetail;
  @Input() accountJobList;
  @Input() historyJobList;
  @Input() listTableHeads;
  @Input() userType;
  @Input() permissions;
  @Input() tableHead;
  @Output() updateAccountSearch = new EventEmitter();
  @Output() updateHistorySearch = new EventEmitter();
  @Output() editJob = new EventEmitter();
  @Output() accountJobStatus = new EventEmitter();
  @Output() historyJobStatus = new EventEmitter();
  @Output() updateProfile = new EventEmitter();
  @Output() updatePassword = new EventEmitter();
  loggedUser;

  ngOnInit() {
    this.loggedUser = JSON.parse(this.user.getUserData('userInfo'));
  }

  updateCurrentSearch(event){
    console.log(event);
    this.updateAccountSearch.emit(event);
  }

  editTheJob(event){
    console.log(event);
    this.editJob.emit(event);
  }

  updateCurrentJobStatus(event){
    console.log(event);
    this.accountJobStatus.emit(event);
  }

  updatesHistorySearch(event){
    console.log(event);
    this.updateHistorySearch.emit(event);
  }

  updateHistoryJobStatus(event){
    console.log(event);
    this.historyJobStatus.emit(event);
  }

  editProfile(){
    this.updateProfile.emit(this.loggedUser);
  }

  editPassword(){
    this.updatePassword.emit(this.loggedUser);
  }

}

