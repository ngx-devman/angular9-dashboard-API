import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.scss']
})
export class TermsModalComponent implements OnInit {
  
  @ViewChild("termDlg",{static:false}) termDlg: ModalDirective;

  constructor() { }

  ngOnInit() {
  }

  onAgreeTerm() {
    this.termDlg.show();
  }

}
