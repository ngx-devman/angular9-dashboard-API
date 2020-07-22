import { Component, Input } from "@angular/core";
import { ApiProvider } from "../../../service/api";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-jobs-category",
  templateUrl: "./jobs-category.component.html",
  styleUrls: ["./jobs-category.component.scss"],
})
export class JobsCategoryComponent {
  customerId: String;

  constructor(
    private apiProvider: ApiProvider,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get("id");
    });
  }

  createTicket() {
    this.apiProvider.updateShowServiceTicket(true);
    this.router.navigate(["/schedule"]);
  }
}
