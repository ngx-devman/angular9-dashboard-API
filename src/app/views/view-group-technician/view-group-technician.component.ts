import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-group-technician',
  templateUrl: './view-group-technician.component.html',
  styleUrls: ['./view-group-technician.component.scss']
})
export class ViewGroupTechnicianComponent implements OnInit {

  techinfo=[
    {no:"1",date:"20/8/2019",signin:"8:00 AM", signout:"6:30 PM", location: "Kolhapur"},
    {no:"2",date:"21/8/2019",signin:"8:10 AM", signout:"6:30 PM", location: "Kolhapur"},
    {no:"3",date:"22/8/2019",signin:"9:30 AM", signout:"8:30 PM", location: "Kolhapur"},
  ]
  constructor() { }

  ngOnInit() {
  }

}
