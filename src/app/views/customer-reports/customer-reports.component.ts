import { Component } from "@angular/core";
import { ApiProvider } from "../../service/api";
import { ActivatedRoute } from "@angular/router";
import { UserService } from '../../shared/users/user.service';

@Component({
  selector: "app-customer-reports",
  templateUrl: "./customer-reports.component.html",
  styleUrls: ["./customer-reports.component.scss"],
})
export class CustomerReportsComponent {
  customerId: string;
  reportsList: Array<any> = [];
  reportsListData: Array<any> = [];
  listTitle: string = "Customer Reports";
  listTableHeads = [
    "Job ID", "Status", "Technician", "Customer", "Type", "Schedule", "Time", "Options"
  ];
  searchReports: any;
  paramCustomer: string = '';

  constructor(private apiProvider: ApiProvider, private route: ActivatedRoute, private userInfo:UserService) {
    this.customerId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getCustomer('true', 'false');
    this.apiProvider
      .InventoryReport()
      .subscribe((res: { status: number; companyEquipmentInventory: any[] }) => {
        if (res.status === 1) {
          this.reportsList = [...res.companyEquipmentInventory];
          this.reportsListData = [...this.reportsList];
        } else {
          // toast with network error or something
        }
      });
  }

  updateSearch(event) {
    this.searchReports = event;
    this.reportsList = this.filterJobs();
  }

  filterJobs() {
    let list = [];
    this.reportsListData.map((item) => {
      if (
        this.searchReports.name.length > 0 &&
        item.customer.type.item
          .toLowerCase()
          .indexOf(this.searchReports.name.toLowerCase()) == -1
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
