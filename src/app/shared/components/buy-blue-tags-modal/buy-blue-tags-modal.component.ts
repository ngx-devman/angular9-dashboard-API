import { UserService } from './../../users/user.service';
import { ApiProvider } from './../../../service/api';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-buy-blue-tags-modal',
  templateUrl: './buy-blue-tags-modal.component.html',
  styleUrls: ['./buy-blue-tags-modal.component.scss']
})
export class BuyBlueTagsModalComponent implements OnInit {
  @ViewChild('buyDlg', { static: false }) buyDlg: ModalComponent;

  public cardData: any;
  public blueTagForm: FormGroup;

  @Output() responseMessage = new EventEmitter();

  get noOfTags() {
    return this.blueTagForm.get('noOfTags');
  }
  get total() {
    return this.blueTagForm.get('total');
  }
  get tax() {
    return this.blueTagForm.get('tax');
  }

  constructor(
    public apiProvider: ApiProvider,
    public userinfo: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getCompanyCards();
    this.blueTagForm = this.createBlueTagForm();
  }

  onBuyTag(quantity?: number) {
    if (quantity) this.blueTagForm.get('noOfTags').patchValue(quantity);
    this.buyDlg.open();
  }

  getCompanyCards() {
    this.apiProvider.apitoken = JSON.parse(this.userinfo.getUserData('token'));
    this.apiProvider.getCompanyCards().subscribe(response => {
      console.log("cards", response);
      debugger;
      if (response['status'] == "1") {
        this.cardData = response['cards'];
      }
    })
  }

  createBlueTagForm(): FormGroup {
    return this.fb.group({
      name: ["", [Validators.required]],
      noOfTags: [0, [Validators.required, Validators.min(1)]],
      total: [0, [Validators.required]],
      tax: [0, [Validators.required]],
      cardId: ["", [Validators.required]],
      street: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      zipCode: ["", [Validators.required]]
    });
  }

  onConfirmBuy() {
    this.addTags();
  }

  addTags() {
    if (this.blueTagForm.invalid) return;

    this.apiProvider.apitoken = JSON.parse(this.userinfo.getUserData('token'));
    const placeOrderDto = this.fb.group({
      noOfTags: "", total: "", tax: "", cardId: "", street: "", city: "", state: "", zipCode: ""
    });
    placeOrderDto.patchValue(this.blueTagForm.value);
    console.log("param", placeOrderDto.value)

    this.apiProvider.placeOrder(placeOrderDto.value).subscribe(response => {
      this.responseMessage.emit(response);
      this.onCancelBuy();
    })
  }

  setSales() {
    this.total.patchValue((this.noOfTags.value * 5).toFixed(2));
    this.tax.patchValue((this.noOfTags.value * 5 * 0.0825).toFixed(2));
  }

  onCancelBuy() {
    this.blueTagForm.reset();
    this.buyDlg.close();
  }
}
