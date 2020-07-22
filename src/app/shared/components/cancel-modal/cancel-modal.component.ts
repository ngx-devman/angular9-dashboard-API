import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-cancel-modal',
  templateUrl: './cancel-modal.component.html',
  styleUrls: ['./cancel-modal.component.scss']
})
export class CancelModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public inputData:any,
    public dialog:MatDialogRef<CancelModalComponent>,
  ) { }

  ngOnInit() {
  }

  close(){
    this.dialog.close(false);
  }

  confirmCancel(){
    this.dialog.close(true);
  }

}
