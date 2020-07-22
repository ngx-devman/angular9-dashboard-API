import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-buytag-main',
  templateUrl: './buytag-main.component.html',
  styleUrls: ['./buytag-main.component.scss']
})
export class BuytagMainComponent implements OnInit {
  @ViewChild('buyDlg', { static: false }) buyDlg;

  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
  });
  public buyTagsConfig: BuyTagConfig[];

  constructor(
    private mdToast: ToasterService
  ) {
    this.buyTagsConfig = [
      {
        custom: false,
        colored: true,
        bgColor: 'bg-primary',
        bgTextColor: 'text-white',
        icon: 'icon-basket-loaded',
        mainTitle: 'Buy 50',
        subTitle: 'Tags',
        quantity: 50,
        buyText: 'Buy Now',
        dimension: true,
        dimensions: [
          {
            option: 1,
            optionTitle: '2x2 inches (Square)',
            optionName: 'selection-of-quantity-50',
            selected: false
          },
          {
            option: 2,
            optionTitle: '1 inch (Circle)',
            optionName: 'selection-of-quantity-50',
            selected: false
          }
        ]
      },
      {
        custom: false,
        colored: true,
        bgColor: 'bg-warning',
        bgTextColor: 'text-white',
        icon: 'icon-basket-loaded',
        mainTitle: 'Buy 100',
        subTitle: 'Tags',
        quantity: 100,
        buyText: 'Buy Now',
        dimension: true,
        dimensions: [
          {
            option: 1,
            optionTitle: '2x2 inches (Square)',
            optionName: 'selection-of-quantity-100',
            selected: false
          },
          {
            option: 2,
            optionTitle: '1 inch (Circle)',
            optionName: 'selection-of-quantity-100',
            selected: false
          }
        ]
      },
      {
        custom: false,
        colored: true,
        bgColor: 'bg-success',
        bgTextColor: 'text-white',
        icon: 'icon-basket-loaded',
        mainTitle: 'Buy 500',
        subTitle: 'Tags',
        quantity: 500,
        buyText: 'Buy Now',
        dimension: true,
        dimensions: [
          {
            option: 1,
            optionTitle: '2x2 inches (Square)',
            optionName: 'selection-of-quantity-500',
            selected: false
          },
          {
            option: 2,
            optionTitle: '1 inch (Circle)',
            optionName: 'selection-of-quantity-500',
            selected: false
          }
        ]
      },
      {
        custom: true,
        colored: true,
        bgColor: 'bg-danger',
        bgTextColor: 'text-white',
        icon: 'icon-basket-loaded',
        mainTitle: 'Buy',
        subTitle: 'Tags',
        quantity: 0,
        buyText: 'Buy Now',
        dimension: true,
        dimensions: [
          {
            option: 1,
            optionTitle: '2x2 inches (Square)',
            optionName: 'selection-of-quantity-any',
            selected: false
          },
          {
            option: 2,
            optionTitle: '1 inch (Circle)',
            optionName: 'selection-of-quantity-any',
            selected: false
          }
        ]
      }
    ]
  }

  ngOnInit() {
  }

  onBuyTag(quantity) {
    this.buyDlg.onBuyTag(quantity);
  }

  addQuantity(buyTagDto) {
    buyTagDto.quantity += 1;
  }

  minusQuantity(buyTagDto) {
    const { quantity } = buyTagDto;
    if (quantity === 0) return;
    buyTagDto.quantity -= 1;
  }

  FromBuyTagModal(response) {
    if (response['status'] == "1") {
      this.toast(response['message'], "success");
      return;
    }

    this.toast('Something went wrong', "error")
  }

  public toast(text, type) {
    var toast: Toast = {
      type: type,
      title: text,
      showCloseButton: true
    };
    this.mdToast.pop(toast);
  }

}

interface BuyTagConfig {
  custom: boolean,
  colored: boolean,
  bgColor: string,
  bgTextColor: string,
  icon: string,
  mainTitle: string,
  subTitle: string,
  quantity: number,
  buyText: string,
  dimension: boolean,
  dimensions: {
    option: number,
    optionTitle: string,
    optionName: string,
    selected: boolean
  }[]
}