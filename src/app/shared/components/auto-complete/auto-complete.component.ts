import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredStates: Observable<any[]>;
  selectedCustomer:any;
  selectedId:any;
  @Input() autoList:any[] = [];

  constructor() { 
    
  }
  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.autoList.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
  
  ngOnInit() {
    
  }

  displayAutoOptions(){
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.autoList.slice())
      );
  }

  updateAutoComplete(event){
    console.log(this.selectedId);
  }

  optionSelected(event){
    let selected = this.autoList.filter( state => state._id == event.option.value);
    this.selectedId = selected[0]._id;
    this.stateCtrl.setValue(selected[0].name);
    console.log(this.selectedId);
  }

}
