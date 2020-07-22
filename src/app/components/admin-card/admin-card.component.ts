import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.scss']
})
export class AdminCardComponent implements OnInit {
  @Input() item: any;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  hover = false;
  constructor() { }

  ngOnInit() {
    // console.log('this is admin card pass item data: ', this.item) 
  }

  onClickCard(clickType: any) {
    this.onClick.emit(clickType);
  } 

}
