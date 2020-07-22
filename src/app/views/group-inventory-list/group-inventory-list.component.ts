import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-inventory-list',
  templateUrl: './group-inventory-list.component.html',
  styleUrls: ['./group-inventory-list.component.scss']
})
export class GroupInventoryListComponent implements OnInit {
  inventoryName=[{name:"Asus 3090",type:"A1",group:"GroupA"},
                  {name:"Pc Beta",type:"A3",group:"GroupB"}
               ]
  constructor() { }
  ngOnInit() {
  }
}