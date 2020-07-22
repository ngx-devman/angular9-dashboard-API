import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sub-category-card',
  templateUrl: './sub-category-card.component.html',
  styleUrls: ['./sub-category-card.component.scss']
})
export class SubCategoryCardComponent {
  @Input() item;
  @Output() onRouteChange: EventEmitter<any> = new EventEmitter();

  public routeChange(item): void {
    this.onRouteChange.emit(item);
  }
}
