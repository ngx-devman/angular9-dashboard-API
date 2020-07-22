import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal';

@Component({
  selector: 'app-custom-work-report',
  templateUrl: './custom-work-report.component.html',
  styleUrls: ['./custom-work-report.component.scss']
})
export class CustomWorkReportComponent implements OnInit {
  @ViewChild('numDlg',{static:false}) numDlg: ModalComponent;
number =[
  {No:'0001', doc:"Work Orders/Tickets"},
  {No:'0001', doc:"Quotes"}, 
   {No:'0001', doc:"Invoices"}
];
numbers:any;
  constructor(private router: Router,) { }

  ngOnInit() {
  }

  goToNumber(item){
    console.log("item",item);
    this.numbers=item.No
    this.numDlg.open();
  }
  onCancelEdit(){
    this.numDlg.close();
  }

}
