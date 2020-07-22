import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-more',
  templateUrl: './inventory-more.component.html',
  styleUrls: ['./inventory-more.component.scss']
})
export class InventoryMoreComponent implements OnInit {

  inventoryName:any;
  data:any;

  constructor() { }

  ngOnInit() {
  }

}
