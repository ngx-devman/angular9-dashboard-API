import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-past-invoice',
  templateUrl: './past-invoice.component.html',
  styleUrls: ['./past-invoice.component.scss']
})
export class PastInvoiceComponent implements OnInit {
  InvoiceList=[
    {"no":1,"customername":"tester","date":"12 August 2019","time":"12:00"},
    {"no":2,"customername":"Abctester","date":"1 June 2019","time":"10:30"}]
  constructor(   private router: Router,) { }

  ngOnInit() {
  }
  showReport(){
    this.router.navigate(['/main/viewreport']);
}
}
