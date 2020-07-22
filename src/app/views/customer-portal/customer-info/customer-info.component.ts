import { Component, Input } from "@angular/core";

@Component({
  selector: "app-customer-info",
  templateUrl: "./customer-info.component.html",
  styleUrls: ["./customer-info.component.scss"],
})
export class CustomerInfoComponent {
  @Input() customer: any;

  constructor() {}
}
