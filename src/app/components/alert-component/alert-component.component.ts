import { Component, OnInit, OnDestroy, Input, Inject } from '@angular/core';
import { Alert, AlertType } from './alert.model';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-alert-component',
  templateUrl: './alert-component.component.html',
  styleUrls: ['./alert-component.component.scss']
})
export class AlertComponentComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    ) { }

  ngOnInit() {
      // this.subscription = this.alertService.onAlert(this.id)
      //     .subscribe(alert => {
      //         if (!alert.message) {
      //             // clear alerts when an empty alert is received
      //             this.alerts = [];
      //             return;
      //         }

      //         // add alert to array
      //         this.alerts.push(alert);
      //     });
  }

  // ngOnDestroy() {
  //     // unsubscribe to avoid memory leaks
  //     this.subscription.unsubscribe();
  // }

  // removeAlert(alert: Alert) {
  //     // remove specified alert from array
  //     this.alerts = this.alerts.filter(x => x !== alert);
  // }

  removeAlert() {
      
  }

  cssClass(alert: Alert) {
      if (!alert) {
          return;
      }

      // return css class based on alert type
      switch (alert.type) {
          case AlertType.Success:
              return 'alert alert-success';
          case AlertType.Error:
              return 'alert alert-danger';
          case AlertType.Info:
              return 'alert alert-info';
          case AlertType.Warning:
              return 'alert alert-warning';
      }
  }

}
