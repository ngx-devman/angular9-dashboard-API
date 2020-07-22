import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ApiProvider } from '../../../service/api';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent implements OnInit {

  constructor(private router:Router, private apiProvider:ApiProvider, private user:UserService) { }
  @Input() tableHeads:string[] = [];
  @Input() tableList:any[] = [];
  @Input() displayIcons:boolean = false;
  @Input() type:string = 'customer';
  @Input() userType:string = 'employee';
  @Input() viewUser:string;
  @Output() visitList = new EventEmitter();
  @Output() equipList = new EventEmitter();
  @Output() editCustomer = new EventEmitter();
  @Output() updateMember = new EventEmitter();
  @Output() updateInventory = new EventEmitter();
  @Output() createNewJob = new EventEmitter();
  @Output() showServiceTicketInfo = new EventEmitter();
  @Output() jobDetails = new EventEmitter();
  @Output() editJob = new EventEmitter();
  @Output() rowClicked = new EventEmitter();
  @Output() detailedImage = new EventEmitter();

  loggedUser;

  ngOnInit() {
    console.log(this.tableList);
    this.loggedUser = JSON.parse(this.user.getUserData('userInfo'));
    
  }

  goToDetail(item){
    console.log(item);
    let profile = new individualProfile('Vendor', item, '/vendors', 'Vendor');
    this.apiProvider.updateIndividualProfile(profile);
    this.router.navigate([`/individual-profile`]);
  }

  goToVisitList(item){
    this.visitList.emit(item);
  }

  Equiplist(item){
    this.equipList.emit(item);
  }

  onEditCustomer(item){
    this.editCustomer.emit(item);
  }

  Inventory(item){
    this.updateInventory.emit(item);
  }

  onMembers(item,idx){
    this.updateMember.emit({item: item, idx: idx});
  }

  createJob(item){
    this.createNewJob.emit(item);
  }

  infoServiceTicket(item){
    this.showServiceTicketInfo.emit(item);
  }

  jobDetail(item){
    console.log(item);
    this.jobDetails.emit(item);
  }

  gotoReport(item){
    if(item.status == 2){
      this.router.navigate([`/report/${item._id}`]);
    }
  }

  toolTipText(item){
    let text = '';
    if(item.status == 2){
      text = 'View Report';
    }
    return text;
  }

  editTheJob(item){
    this.editJob.emit(item);
  }

  onViewCustomer(customer) {
    this.router.navigateByUrl("/customers/" + customer._id);
  }

  onRowClick() {
    this.rowClicked.emit({});
  }

  onDetailImg(imgUrl) {
    this.detailedImage.emit(imgUrl);
  }

  viewInvoice(item){
    console.log(item);
    this.apiProvider.updateInvoiceDetail(item);
    this.router.navigate(['invoice-page/invoice-detail']);
  }

}

export class individualProfile{
  constructor(type, detail, route, title){
    this.type = type;
    this.details = detail;
    this.backRoute = route;
    this.title = title;
  }
  type:string;
  details: any;
  backRoute: string;
  title:string;
}
