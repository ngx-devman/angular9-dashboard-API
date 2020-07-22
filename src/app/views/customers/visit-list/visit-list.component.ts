import { Component,ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Location } from '@angular/common';
import { ApiProvider } from '../../../service/api';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    isSameDay,
    isSameMonth,
    addWeeks,
    subWeeks,
    addMonths,
    subMonths,
} from 'date-fns';
import { Subject } from 'rxjs';
import {CalendarEvent, CalendarEventTimesChangedEvent} from 'angular-calendar'; // import should be from `angular-calendar` in your app

@Component({
    selector: 'app-visit-list',
    templateUrl: './visit-list.component.html',
    styleUrls: ['./visit-list.component.scss'],

    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})

export class VisitListComponent {
    @ViewChild('cancelDlg',{static:false}) cancelDlg: ModalComponent;
    @ViewChild('custDlg',{static:false}) custDlg: ModalComponent;
    @ViewChild('elem',{static:false}) elem: ElementRef;
    public customerList: Array<any> = [];
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        // tapToDismiss: true,
        //timeout: 500000
    });
    msg = '';
    jobTypeData: any;
    dateTime: any;
    technicianId: any;
    customerId: any;
    jobTypeId: any;
    jobData: any;
    technicianData: any;
    customerdata: any;
    equipmentData: any;
    tech_Id: any;
    cust_Id: any;
    jobtype_id: any;
    job_Id: any;
    status: any;
    comment: any;
    jobId: any;
    statusName = [{ name: "Pending", status: "0" },
    { name: "Started", status: "1" },
    { name: "Finished", status: "2" }]
    statusTitle: any;
    status_id: any;
    editable: any;
    customer_name = "";
    jobList: Array<any> = [];
    Employeedata: any;
    employee_id: any;
    flag: any;
    AllGroupData: any;
    customer_id: any;
    equipment_id: any;
    EquipmentId: any;
    note: any;
    events: CalendarEvent[];
    viewDate: Date = new Date();
    view: string = 'month';
    refresh: Subject<any> = new Subject();
    activeDayIsOpen: boolean = true;
    public show: boolean = false;
    public buttonName: any = 'View List';
    cancel_comment = '';
    companyAdmin:any;
    listName:any;
    data_customer:any;
    constructor(
        public colors: ColorsService,
        public http: Http,
        private router: Router,
        private userInfo: UserService,
        private mdToast: ToasterService,
        private location: Location,
        public apiProvider: ApiProvider,
        public route: ActivatedRoute,
        private renderer2: Renderer2
    ) {
        
        this.userInfo.customer.subscribe(data =>{
            console.log("data",data)
            this.data_customer= data['customer']
            console.log(this.data_customer)
        })
        console.log(this.customer_name);
        this.getJob(this.data_customer);
        this.getType();
        this.getTechnician();
        this.getCustomer('true', 'false');
        this.getAllEmployee();
        this.getAllEmployeeForJob();
    
    }

    getJob(name) {
        this.userInfo.changeName('default name');
        this.customer_name = name;
        console.log("customer name",this.customer_name)
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.apiProvider.getJob().subscribe(response => {
            console.log("response", response);
            if (this.customer_name != undefined) {
                this.jobData = response['jobs'];
                this.jobList = this.filterSearch()
                console.log("job Data", this.jobData)
            } else {
                this.jobList = this.removeCancelFromJobList(response['jobs'])//response['jobs'];
                this.getJobEvents();
            }
        })
    }

    removeCancelFromJobList(allJobs){

        let list = []
        list = allJobs.filter((item) => {
            return (item.status != 3);
        })
        // console.log("dataa", this.jobData)
        // console.log("list", list)
        return list;

    }

    getCustomerEquipment() {
        console.log("customerr iddd", this.customer_id)
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            customerId: this.customer_id
        }
        this.apiProvider.getCustomerEquipment(params).subscribe(response => {
            console.log("get customer  equipment33333333333", response)
            this.equipmentData = response['equipments'];
        })
    }

    getAllEmployeeForJob() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.apiProvider.getAllEmployeeForJob().subscribe(response => {
            console.log("employee", response);
            if (response['status'] == '1') {
                this.AllGroupData = response['employees']
            }
        })
    }
    getAllEmployee() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.apiProvider.getAllEmployee().subscribe(response => {
            console.log("All employee", response['employees'])
            // if (response['status'] == '1') {
            this.Employeedata = response['employees']
           this.companyAdmin = response['company']
           this.Employeedata.push(this.companyAdmin)
            // }
        })
    }
    getType() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.apiProvider.getJobType().subscribe(response => {
            // this.createType();
            console.log("response", response);
            this.jobTypeData = response['types'];
        })
    }
    getTechnician() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.apiProvider.getTechnician().subscribe(response => {
            console.log("tech data", response);
            if (response['status'] == '1') {
                this.technicianData = response['users'];
            }
        })
    }
    getCustomer(includeActive, includeNonActive) {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            includeActive: includeActive,
            includeNonActive: includeNonActive,
        }
        console.log("params", params);
        this.apiProvider.getCustomer(params).subscribe(response => {
            console.log('customer response----------', response)
            if (response['status'] == '1') {
                console.log("customer data", response['customers'])
                this.customerdata = response['customers'];
            }
        })
    }
    onCancelVisitor() {
        this.custDlg.close();
        this.dateTime = '';
        this.technicianId = '';
        this.customerId = '';
        this.jobId = '';
      
    }
    goToVisitList() {
        this.flag = 0;
        this.custDlg.open();
    }
    
    addTech(event: any) {
    }
    addCustomer(event: any) {
    }
    addjob(event: any) {
    }
    addstatus(event: any) {
    }
    addEmployee(event: any) {

    }
    formatDate(date) {
        if(date != null){
            var dateTime = date.substring(0, 10);
            var d = dateTime.split('-');
            return d[1] +'/'+ d[2] +'/'+ d[0];
        }else{
            return;
        }
        // var dateTime = date.substring(0, 10);
        // // var today = new Date(dateTime);
        // // var dd = today.getDate();
        // // var mm = today.getMonth() + 1;
        // // var yyyy = today.getFullYear();
        // //return mm + '/' + dd + '/' + yyyy

        // var d = dateTime.split('-');
        // return d[1] +'/'+ d[2] +'/'+ d[0];

    }
    formatTime(time) {
        if(time != null){
            var dateTime = time.substring(11, 16);
            var hourEnd = dateTime.indexOf(":");
            var H = +dateTime.substr(0, hourEnd);
            var h = H != 12 ? H % 12 : H;
            var ampm = H < 12 ? " AM" : " PM";
            time = h + dateTime.substr(hourEnd, 3) + ampm;
            return time;
        }else{
            return;
        }
    }
    // formatTime(time) {
    //     var dateTime = time.substring(11, 16);
    //     var hourEnd = dateTime.indexOf(":");
    //     var H = +dateTime.substr(0, hourEnd);
    //     var h = H % 12;
    //     var ampm = H < 12 ? " AM" : " PM";
    //     time = h + dateTime.substr(hourEnd, 3) + ampm;
    //     return time;
    // }
    onConfirmVisitor() {
        if (this.flag) {
            this.updateJob();
        } else {
            this.addJobToServer();
        }
        this.custDlg.close();  
    }

    showReport(item) {
        console.log("show report");
        console.log("jobitem ========", item);
        this.router.navigate(['/main/viewreport'], { queryParams: {"jobId": item._id, "description": item.description}, skipLocationChange: true});
        // let technicianName = item['technician']['profile']['displayName'];
        // let type = item['type']['title']
        // let dateTime = item['dateTime']
        // let customer = item['customer']['info']['name']
        // let comment = item['comment'];
        // let companyName = item['company']['info']['companyName'];
        // let description = item['description'];
        // this.router.navigate(['/main/viewreport'], { queryParams: { "technicianName": technicianName, "type": type, "dateTime": dateTime, "customer": customer, "comment": comment, "companyName": companyName, "description": description }, skipLocationChange: true });
    }
    goBack() {
        this.location.back();
    }
    select(name) {
        console.log(name);
        var id = this.technicianData.find(x => x.profile.displayName == name);
        this.tech_Id = id._id;
    }
    selectCustomer(name) {
        console.log(name);
        var id = this.customerdata.find(x => x.info.name == name);
        this.cust_Id = id._id;
        console.log(id._id);
        this.customer_id = this.cust_Id;
        this.getCustomerEquipment();
    }

    selectType(name) {
        console.log(name);
        var id = this.jobTypeData.find(x => x.title == name);
        this.jobtype_id = id._id;
        console.log(id._id);
    }
    selectStatus(name) {
        console.log(name)
        var statusTitle = this.statusName.find(x => x.name == name)
        console.log("statusTitle", statusTitle)
        this.status_id = statusTitle.status
        console.log("status", this.status_id)
    }
    selectEmployee(name) {
        console.log("employee bnameeee", name);
        var id = this.Employeedata.find(x => x.profile.displayName == name);
        this.employee_id = id._id;
        console.log("employeeee iIDdddddd", id._id);
    }
    selectEquipment(name) {
        console.log("equipment nameeee", name);
        var id = this.equipmentData.find(x => x.info.model == name);
        this.equipment_id = id._id;
        console.log("equipment iIDdddddd", id._id);
    }

    onEditJob(item) {
        console.log("item data", item);
        debugger;
        // this.updatejobDlg.open();
        this.customer_id = item.customer._id;
        console.log("customer idddd", this.customer_id)
        this.getCustomerEquipment()
        this.job_Id = item._id
        console.log("job iddd", this.job_Id)
        if(item.dateTime != null){
            this.dateTime = item.dateTime.substring(0, 16);
        }
        
        console.log("date time edit", this.dateTime)
        this.technicianId = item.technician != undefined ? item.technician.profile.displayName : '';
        this.employee_id = item.technician._id;
        this.customerId = item.customer != undefined ? item.customer.info.name : '';
        this.jobTypeId = item.type != undefined ? item.type.title : '';
        this.note =item != undefined ? item.description :'';
        this.flag = 1;
        this.custDlg.open();
    }

    // onConfirmJob() {
    //     this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    //     let param = {
    //         jobId: this.job_Id,
    //         status: this.status_id,
    //         comment: this.comment//this.jobData['comment']
    //     }
    //     this.apiProvider.updateJob(param).subscribe(response => {
    //         console.log("update joob ", response)
    //         if (response['status'] == 1) {
                
    //             this.getJob(this.route.snapshot.queryParams["customer"]);
    //             this.toast(response['message'], "success");
    //         } else {
    //             this.toast(response['message'], "failed");
    //         }
    //     })
    // }
    onCancelJob() {
        //this.updatejobDlg.close();
       // this.onCancelVisitor();
       this.custDlg.close();
        this.cancelDlg.open();
        //cancelJob
    }
    filterSearch() {
        console.log("customer", this.customer_name.toLowerCase())
        let list = []
        list = this.jobData.filter((item) => {
            return (item.customer.info.name.toLowerCase() === this.customer_name.toLowerCase());
        })
        console.log("dataa", this.jobData)
        console.log("list", list)
        return list;

    }
    addJobToServer() {
 
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let param = {
            dateTime: this.dateTime,
            technicianId: this.employee_id,
            customerId: this.cust_Id,
            jobTypeId: this.jobtype_id,
            description: this.note,
            equipmentId: this.equipment_id
        }
        console.log("params", param);
        this.apiProvider.createJob(param).subscribe(response => {
            console.log("job response", response)
            
            // alert(response['message']);

            // Swal.fire({
            //     type: 'success',
            //     title: 'Link sent successfully.  Please check your email.'
            // })

            if (response['status'] == '1') {
                this.msg = response['message'];
                document.getElementById("custToast").click();
                //this.toast(response['message'], "success");

                this.getJob(this.data_customer);
              
                
            } else {   
                this.msg = response['message'];
                document.getElementById("custToast").click();
                //this.toast(response['message'], "success");
            }

            this.dateTime = '';
            this.technicianId = '';
            this.customerId = '';
            this.jobId = '';
            this.jobTypeId = '';
            this.customer_id = '';
            this.note = '';
            this.EquipmentId = '';

        })
    }

    updateJob() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let param = {
            dateTime: this.dateTime,
            technicianId: this.employee_id,
            jobId: this.job_Id
        }
        this.apiProvider.editJob(param).subscribe(response => {
            debugger;
            console.log("update job response", response)
            // if (response['status'] == '1') {
            //     debugger;
            //     this.toast(response['message'], "success");
            //    // this.getCustomer("true", "false");
            //     //this.toast(response['message'], "danger");
            //     this.getJob(this.route.snapshot.queryParams["customer"]);
            //     this.getCustomer("true", "false");
            // } else {
            //     this.toast(response['message'], "danger");
            // }
            if (response['status'] == '1') {
            //    this.toast(response['message'], "success");
                this.msg = response['message'];
                document.getElementById("custToast").click();
                this.getCustomer("true", "false");
                this.getJob(this.data_customer);
              
            }
             else {
                this.msg = response['message'];
                document.getElementById("custToast").click();
                //this.toast(response['message'], "error");
            }
                this.dateTime = '';
                this.technicianId = '';
                this.customerId = '';
                this.jobId = '';
                this.jobTypeId = '';
                this.customer_id = '';
                this.note = '';
                this.EquipmentId = '';
          
        })
    }
    
    cancelJob(){

        let param = { jobId :this.job_Id, status:2, comment:this.cancel_comment}

        this.apiProvider.updateJob(param).subscribe(data=>{
            console.log(data);
            debugger
            if (data['status'] == '1') {
                this.dismissView();
                // this.toast(data['message'], "success");
                this.msg = data['message'];
                document.getElementById("custToast").click();
                this.getCustomer("true", "false");
                //this.toast(response['message'], "danger");
                this.getJob(this.data_customer);
            } else {
                this.toast(data['message'], "danger");
            }
            this.cancel_comment = '';
            // this.dismissView();
        })


    }

    getJobEvents = () => {
        this.events = this.jobList.map(job => {
            const jobEventToAdd: CalendarEvent = {
                start: new Date(this.formatDate(job.dateTime)),
                end: new Date(this.formatDate(job.dateTime)),
                title: job.type.title,
            };
            return jobEventToAdd;
        });

    }

    increment(): void {
        const addFn: any = {
            day: addDays,
            week: addWeeks,
            month: addMonths
        }[this.view];
        this.viewDate = addFn(this.viewDate, 1);
    }

    decrement(): void {
        const subFn: any = {
            day: subDays,
            week: subWeeks,
            month: subMonths
        }[this.view];
        this.viewDate = subFn(this.viewDate, 1);

    }

    today(): void {
        this.viewDate = new Date();
    }

    dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }): void {
        console.log("on start")
        console.log(events);

        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
        }
    }

    eventTimesChanged({
        event,
        newStart,
        newEnd
    }: CalendarEventTimesChangedEvent): void {
        event.start = newStart;
        event.end = newEnd;
        this.refresh.next();
    }

    addEvent(): void {
        this.events.push({
            title: 'New event',
            start: startOfDay(new Date()),
            end: endOfDay(new Date()),
            //   color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            }
        });
        console.log("Event added")
        this.refresh.next();
    }

 
    dismissView(){
        this.cancelDlg.close();
    }

    toggle(){
        this.show = !this.show;
        if (this.show)
            this.buttonName = "View Calender";
        else 
            this.buttonName = "View List";
        }
            
        public toast(text, type) {
            var toast: Toast = {
                type: type,
                title: text,
                showCloseButton: true
            };
            this.mdToast.pop(toast);
        }

        beforeToast(){
            this.toast(this.msg,'success');
        }
}
