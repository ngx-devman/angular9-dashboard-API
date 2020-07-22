import { CanDeactivate } from "@angular/router";  
import { Injectable } from "@angular/core";  
import { Observable } from "rxjs/Observable";  
import { MatDialog } from '@angular/material';
import { DefaultModelComponent } from '../shared/components/default-model/default-model.component';
  
export interface SaveComponentCanDeactivate {  
  SamplecanDeactivate: () => boolean | Observable<boolean>;  
}  
  
@Injectable()  
export class SaveChangesGuard implements CanDeactivate<SaveComponentCanDeactivate> {  
  constructor(private dialog: MatDialog) {  
  
  }  
  
  canDeactivate(  
    component: SaveComponentCanDeactivate  
  ): boolean | Observable<boolean> {  
    
      return component.SamplecanDeactivate()  
        ? true  
        : this.callPopup();     
  }
  
  callPopup(){
    let dataValues = {
        status: 'saveChanges',
        cusHeight: false
    }
    let dataInputs = {
        label: "Are you sure you want to leave? Any work will not be saved"
    }

    let data = {
        dataInputs: dataInputs,
        dataValues: dataValues
    }

    const dialogRef = this.dialog.open(DefaultModelComponent, {
        width: '474px',
        data: data,
        panelClass: 'defaultModel' 
    });

    return dialogRef.afterClosed();
  }
}  