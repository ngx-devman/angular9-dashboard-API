import { Component } from "@angular/core"
import { ApiProvider } from "../../service/api"
import { ActivatedRoute } from "@angular/router"
import { MatDialog } from '@angular/material'
import { DefaultModelComponent } from '../../shared/components/default-model/default-model.component'
import { ToasterService } from 'angular2-toaster'


@Component({
  selector: "app-customer-tickets",
  templateUrl: "./customer-tickets.component.html",
  styleUrls: ["./customer-tickets.component.scss"],
})
export class CustomerTicketsComponent {
  customerId: string
  listTitle:string = 'Customer Tickets';
  listTableHeads = ['Ticket ID', 'Created At', 'Customer', 'Create Job', 'Created By'];
  serviceTickets: any
  public ticketsList: Array<any> = [];
  searchOpt: any = {
    name: '',
  };

  constructor(
    private apiProvider: ApiProvider, 
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private mdToast: ToasterService
    ) {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.apiProvider.getServiceTicket().subscribe(res => {
      this.serviceTickets = res;
      this.ticketsList = this.serviceTickets.serviceTickets;
    })
  }

  filterSearch() {
    let list = [];
    this.ticketsList.map(item => {
      console.log(item)
        if (this.searchOpt.name.length > 0 && item.ticketId.toLowerCase().indexOf(this.searchOpt.name.toLowerCase())) {
            return;
        }
        list.push(item);
    });
    return list;
  }

  updateSearch(event){
    this.searchOpt = event;
    this.ticketsList = this.filterSearch();
  }

  showJobDetail(event){
    alert('aa')
    console.log(event, 'evb');
    const dialogRef = this.dialog.open(DefaultModelComponent, {
        width: '474px',
        data: this.generateInfoModalValues(event, 'Job Info', 'jobInfo'),
        panelClass: 'defaultModel'
    });

    dialogRef.afterClosed().subscribe((data:any) => {
        console.log(data);
    });
  }

  showServiceTicketInfo(event){
    const dialogRef = this.dialog.open(DefaultModelComponent, {
        width: '474px',
        data: this.generateInfoModalValues(event, 'Service Ticket Info', 'serviceInfo'),
        panelClass: 'defaultModel'
    });

    dialogRef.afterClosed().subscribe((data:any) => {
        console.log(data);
    });
  }

  createServiceJob(event){
    const dialogRef = this.dialog.open(DefaultModelComponent, {
        width: '474px',
        panelClass: 'defaultModel'
    });
    console.log(event);
    dialogRef.afterClosed().subscribe((data:any) => {
        console.log(data);
        if(data.data.createNew){
            let jobData = data.data.dataValues;
            jobData['selectedCustomer'] = event.customer._id;
            jobData['note'] = data.data.dataValues.description;
            this.createserviceSingleJob(jobData, event._id);
        }
    });
  }

  createserviceSingleJob(data, id){
    let params = {
        dateTime: data.date,
        ticketId: id,
        technicianId: data.selectedTechnician,
        customerId: data.selectedCustomer,
        jobTypeId: data.jobType,
        description: data.note,
        employeeType: data.employeeType
    }

    if(data.customEquipment != ""){
        params['equipmentId'] = data.customEquipment
    }
    
    this.apiProvider.createJob(params).subscribe((response:any) => {
        console.log()        
    });
  }

  generateInfoModalValues(event, title, status){
    let dataValues = {
        title: title,
        status: status,
        data: event,
        cusHeight: false
    }
    let data = {
        dataValues: dataValues
    }
    return data;
  }
}
