import { Injectable } from '@angular/core';
import {  MatSnackBar } from '@angular/material';

import { AlertComponentComponent } from '../components/alert-component/alert-component.component';
import { AlertType } from '../components/alert-component/alert.model';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

    snackBarAutoHide = 2000;

    constructor(
        private snackBar: MatSnackBar
    ) {
      // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    //   this.router.events.subscribe(event => {
    //       if (event instanceof NavigationStart) {
    //           if (this.keepAfterRouteChange) {
    //               // only keep for a single route change
    //               this.keepAfterRouteChange = false;
    //           } else {
    //               // clear alert messages
    //               this.clear();
    //           }
    //       }
    //   });
    }

    public  openSnackBar(message: string, alertId?: string) {
    this.snackBar.openFromComponent(AlertComponentComponent, {
        duration: this.snackBarAutoHide,
        data: { message, type: AlertType.Success, alertId },
        verticalPosition: 'top',
        horizontalPosition  : 'right',
        panelClass: ['alert', 'alert-success']
        });
    }

    // convenience methods
    public success(message: string, alertId?: string) {
        this.snackBar.openFromComponent(AlertComponentComponent, {
            duration: this.snackBarAutoHide,
            data: { message, type: AlertType.Success, alertId },
            verticalPosition: 'top',
            horizontalPosition  : 'right',
            panelClass: ['alert', 'alert-success']
        });
    }

    public error(message: string, alertId?: string) {
        this.snackBar.openFromComponent(AlertComponentComponent, {
            duration: this.snackBarAutoHide,
            data: { message, type: AlertType.Success, alertId },
            verticalPosition: 'top',
            horizontalPosition  : 'right',
            panelClass: ['alert', 'alert-danger']
        });
    }

    public info(message: string, alertId?: string) {
        this.snackBar.openFromComponent(AlertComponentComponent, {
            duration: this.snackBarAutoHide,
            data: { message, type: AlertType.Success, alertId },
            verticalPosition: 'top',
            horizontalPosition  : 'right',
            panelClass: ['alert', 'alert-info']
        });
    }

    public warn(message: string, alertId?: string) {
        this.snackBar.openFromComponent(AlertComponentComponent, {
            duration: this.snackBarAutoHide,
            data: { message, type: AlertType.Success, alertId },
            verticalPosition: 'top',
            horizontalPosition  : 'right',
            panelClass: ['alert', 'alert-warning']
        });
    }

//   // clear alerts
//   clear(alertId?: string) {
//       this.subject.next(new Alert({ alertId }));
//   }

//   // enable subscribing to alerts observable
//   onAlert(alertId?: string): Observable<Alert> {
//       return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
//   }

//   // convenience methods
//   success(message: string, alertId?: string) {
//       this.alert(new Alert({ message, type: AlertType.Success, alertId }));
//   }

//   error(message: string, alertId?: string) {
//       this.alert(new Alert({ message, type: AlertType.Error, alertId }));
//   }

//   info(message: string, alertId?: string) {
//       this.alert(new Alert({ message, type: AlertType.Info, alertId }));
//   }

//   warn(message: string, alertId?: string) {
//       this.alert(new Alert({ message, type: AlertType.Warning, alertId }));
//   }

//   // main alert method    
//   alert(alert: Alert) {
//       this.keepAfterRouteChange = alert.keepAfterRouteChange;
//       this.subject.next(alert);
//   }

//   // clear alerts
//   clear(alertId?: string) {
//       this.subject.next(new Alert({ alertId }));
//   }
}
