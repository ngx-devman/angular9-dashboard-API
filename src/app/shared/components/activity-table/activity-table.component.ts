import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent implements OnInit {

  constructor() { }
  @Input() tableHeads: string[] = [];
  @Input() tableList: any[] = [];
  
  ngOnInit() {
    
  }

}
