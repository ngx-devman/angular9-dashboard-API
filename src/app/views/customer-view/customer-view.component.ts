import { Component } from "@angular/core";
import { ApiProvider } from "../../service/api";
import { ActivatedRoute } from "@angular/router";
import { UserService } from '../../shared/users/user.service';

@Component({
  selector: "app-customer-view",
  templateUrl: "./customer-view.component.html",
  styleUrls: ["./customer-view.component.scss"],
})
export class CustomerViewComponent {
  customerId: string;
  viewList: Array<any> = [];
  viewListData: Array<any> = [];
  searchViews: any;
  listTableHeads = [
    "Type", "Brand", "Model", "Serial Number", "Equipment ID", "Picture"
  ];
  paramCustomer:string = '';
  listTitle:any;
  constructor(private apiProvider: ApiProvider, private route: ActivatedRoute, private userInfo:UserService) {
    this.customerId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getCustomer('true', 'false');
    this.apiProvider
      .getCustomerEquipment({ customerId: this.customerId })
      .subscribe((res: { status: number; equipments: any[] }) => {
        if (res.status === 1) {
          this.viewList = [...res.equipments];
          this.viewListData = [...this.viewList];
        } else {
          // toast with network error or something
        }
      });
  }

  updateSearch(event) {
    this.searchViews = event;
    this.viewList = this.filterJobs();
  }

  filterJobs() {
    let list = [];
    this.viewListData.map((item) => {
      if (
        this.searchViews.name.length > 0 &&
        item.customer.type.item
          .toLowerCase()
          .indexOf(this.searchViews.name.toLowerCase()) == -1
      ) {
        return;
      }
      list.push(item);
    });
    return list;
  }

  getCustomer(includeActive, includeNonActive) {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    let params = {
      includeActive: includeActive,
      includeNonActive: includeNonActive,
    }
    console.log("params", params);
    this.apiProvider.getCustomer(params).subscribe(response => {
      console.log('customer response----------', response)
      if (response['status'] == '1') {
        console.log("customer data", response['customers'])
        response['customers'].map(customer => {
          if (customer._id == this.customerId) {
            this.paramCustomer = customer.profile.displayName;
          }
        });
      }

    });

  }
}
