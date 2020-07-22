import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { TermsModalComponent } from '../../auth-page/terms-modal/terms-modal.component';

@Component({
  selector: 'app-agreed-term-modal',
  templateUrl: './agreed-term-modal.component.html',
  styleUrls: ['./agreed-term-modal.component.scss']
})
export class AgreedTermModalComponent implements OnInit {
  agreedTermFlage: boolean;
  agreeBtTitle = "Agree with terms of use and privacy";
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AgreedTermModalComponent>
  ) { }

  ngOnInit() {
    this.agreedTermFlage = false;
  }

  AgreedTerm(agreed: string) {
    if (agreed === '1') {
      this.dialogRef.close({
        data: {
          agreed: true
        }
      })
    } else {
      this.dialogRef.close({
        data: {
          agreed: false
        }
      })
    }
  }

  showAgreedContent() {
    this.dialog.open(TermsModalComponent, {
      height: '90vh',
      width: '500px'
    });
  }

}
