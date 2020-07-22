import { Component } from "@angular/core";
import { ApiProvider } from "../../service/api";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-customer-portal",
  templateUrl: "./customer-portal.component.html",
  styleUrls: ["./customer-portal.component.scss"],
})
export class CustomerPortalComponent {
  customer: any;
  constructor(private apiProvider: ApiProvider, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      this.apiProvider
      .getCustomerDetail({ customerId: params.get("id") })
      .subscribe((res) => {
        this.customer = res.customer;
      });
    });
  }
}
