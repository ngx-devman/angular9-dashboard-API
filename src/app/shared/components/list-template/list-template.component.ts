import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.scss']
})
export class ListTemplateComponent implements OnInit {

  constructor(private user:UserService) { }
  
  @Input() singleTable: boolean = false;
  @Input() tableList: any[] = [];
  @Input() listTitle:string = ''; 
  @Input() createTitle:string = '';
  @Input() statusAction:boolean = false;
  @Input() listTableHeads:string[] = [];
  @Input() activityTableHeads:string[] = [];
  @Input() activityTableData:any[] = [];
  @Input() listTableIcons:boolean = false;
  @Input() role:number = 0;
  @Input() listTableType: string = 'customer';
  @Input() secondListTableType:string = '';
  @Input() displayActivity:boolean = true;
  @Input() sideText:string = '';
  @Input() displaySideText:boolean = false;
  @Input() multiListTables:boolean = false;
  @Input() secondListTitle:string = '';
  @Input() secondTableList: any[] = [];
  @Input() secondListTableHeads: string[] = [];
  @Input() statusCurrent:boolean = false;
  @Input() serviceStatus:string = 'current';
  @Input() statusJobs: boolean = false;
  @Input() jobStatus:string = 'pending';
  @Input() listingDetails: boolean; // for detail listing view
  @Input() detailListingType: string; // for detail listing type
  @Input() detailsDto: any; // for object details
  @Input() jobsConfig: any; // for job inner anchor boxes
  @Input() equipmentConfig: any; // for equipment inner anchor boxes
  @Input() customerSyncDetails: any; // for customer sync details
  @Input() userCurrentJobs: boolean = false;
  @Input() userHistoryJobs: boolean = false;
  @Input() userType: string = 'employee';
  @Input() viewUser: string;
  @Input() newView: boolean = false;
  @Output() searchResult:any = new EventEmitter();
  @Output() statusUpdate:any = new EventEmitter();
  @Output() createNew:any = new EventEmitter();
  @Output() visitList = new EventEmitter();
  @Output() equipList = new EventEmitter();
  @Output() editCustomer = new EventEmitter();  
  @Output() updateInventory = new EventEmitter();
  @Output() updateMember = new EventEmitter();
  @Output() createNewJob = new EventEmitter();
  @Output() showServiceTicketInfo = new EventEmitter();
  @Output() secondSearchResult:any = new EventEmitter();
  @Output() jobDetails = new EventEmitter();
  @Output() editJob = new EventEmitter();
  @Output() updateJobStatus = new EventEmitter();
  @Output() rowClicked = new EventEmitter();
  @Output() detailedImage = new EventEmitter();
  
  searchOpt: any = {
    name: '',
  };

  secondSearchOpt:any = {
    name: ''
  };

  ngOnInit() {
    console.log(this.secondListTitle);
  }

  onCreateNew(){
    this.createNew.emit('');
  }

  onChangeSearchValue(name, value){
    if (value) {
      this.searchOpt[name] = value;
    } 
    this.searchResult.emit(this.searchOpt);
  }

  onChangeSecondSearchValue(name, value){
    if (value) {
      this.secondSearchOpt[name] = value;
    } 
    this.secondSearchResult.emit(this.secondSearchOpt);
  }

  getUpdatedResult(includeActive, includeNonActive){
    this.statusUpdate.emit({active: includeActive, nonActive: includeNonActive});
  }

  updateVisitList($event){
    this.visitList.emit($event);
  }

  updateEquipList($event){
    this.equipList.emit($event);
  }

  updateEditCustomer($event){
    this.editCustomer.emit($event);
  }

  updatedMember($event){
    this.updateMember.emit($event);
  }

  updatedInventory($event){
    this.updateInventory.emit($event);
  }

  createJob(event){
    this.createNewJob.emit(event);
  }

  infoServiceTicket(event){
    this.showServiceTicketInfo.emit(event);
  }

  jobDetail(event){
    console.log(event);
    this.jobDetails.emit(event);
  }

  editTheJob(event){
    this.editJob.emit(event);
  }

  jobStatusUpdate(event){
    this.jobStatus = event;
    this.updateJobStatus.emit(event);
  }

  onRowClicked(event) {
    this.rowClicked.emit();
  }

  onDetailImg(event) {
    this.detailedImage.emit(event);
  }

} 
