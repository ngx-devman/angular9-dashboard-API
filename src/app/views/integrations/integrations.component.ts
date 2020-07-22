import { Component } from "@angular/core";
import { Toast, ToasterConfig, ToasterService } from "angular2-toaster";

@Component({
  selector: "app-integrations",
  templateUrl: "./integrations.component.html",
  styleUrls: ["./integrations.component.scss"],
})
export class IntegrationsComponent {
  public config: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right",
  });

  constructor(
    private mdToast: ToasterService
  ) {}

  public toast(dto: { title: string, type: string }) {
    const { title, type } = dto;
    const showCloseButton = true;
    const toast: Toast = { type, title, showCloseButton };
    this.mdToast.pop(toast);
  }
}
