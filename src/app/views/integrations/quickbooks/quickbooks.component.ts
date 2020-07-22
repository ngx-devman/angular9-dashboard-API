import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ApiProvider } from "./../../../service/api";
import * as io from "socket.io-client";
import { environment } from "./../../../../environments/environment";

@Component({
  selector: "app-quickbooks",
  templateUrl: "./quickbooks.component.html",
  styleUrls: ["./quickbooks.component.scss"],
})
export class QuickbooksComponent implements OnInit {
  @Output() callToast: EventEmitter<any> = new EventEmitter();

  public customersSynced: boolean;
  public qbAuthorized: boolean;
  public syncingCustomers: boolean;
  public customersSyncedAt: string;
  public customerSelection: boolean;

  constructor(private apiProvider: ApiProvider) {}

  ngOnInit(): void {
    this.customerSelection = false;
    this.apiProvider.getSyncInfo().subscribe(
      (res: {
        status: number;
        customersSynced: boolean;
        qbAuthorized: boolean;
        customersSyncedAt?: string;
      }) => {
        if (res.status === 1) {
          this.customersSynced = res.customersSynced;
          this.qbAuthorized = res.qbAuthorized;
          if (this.customersSynced)
            this.customersSyncedAt = res.customersSyncedAt;
        } else this.somethingWentWrong();
      },
      (err) => this.somethingWentWrong()
    );
  }

  authorizeUri(): void {
    const socketConnection = io.connect(environment.socketConnection);
    socketConnection.on("connect", () => {
      const sessionID = socketConnection.id;
      this.apiProvider.getQBUri(sessionID).subscribe(
        (res: { status: number; authUri: string }) => {
          if (res.status === 1) {
            const parameters = `location=1,width=800,height=650,left=${
              (screen.width - 800) / 2
            },top=${(screen.height - 650) / 2}`;
            const win = window.open(res.authUri, "connectPopup", parameters);
            this.socketConnectionForCallback(socketConnection, sessionID, win);
          } else this.somethingWentWrong();
        },
        (err) => this.somethingWentWrong()
      );
    });
  }

  socketConnectionForCallback(socketConnection, sessionID, win): void {
    socketConnection.on(
      sessionID,
      (data: { status: number; message: string }) => {
        if (data.status === 1) {
          win.close();
          this.callToast.emit({ title: data.message, type: "success" });
          this.syncCustomers();
        } else {
          win.close();
          this.callToast.emit({ title: data.message, type: "failed" });
        }
        socketConnection.close();
      }
    );
  }

  syncCustomers(): void {
    this.syncingCustomers = true;
    !this.customersSynced
      ? this.syncNewCustomers()
      : this.syncExistingCustomers();
  }

  syncNewCustomers(): void {
    this.apiProvider.getQBCustomers().subscribe(
      (res: { status: number; message?: string }) => {
        if (res.status === 1) {
          this.callToast.emit({ title: res.message, type: "success" });
          // reloading component state
          this.ngOnInit();
        } else this.somethingWentWrong();

        this.syncingCustomers = false;
      },
      (err) => {
        this.syncingCustomers = false;
        this.somethingWentWrong();
      }
    );
  }

  syncExistingCustomers(): void {
    this.apiProvider.syncQBCustomers().subscribe(
      (res: { status: number; message?: string }) => {
        debugger;
        if (res.status === 4) {
          this.authorizeUri();
        } else if (res.status === 1) {
          this.callToast.emit({ title: res.message, type: "success" });
          // reloading component state
          this.ngOnInit();
        } else this.somethingWentWrong();

        this.syncingCustomers = false;
      },
      (err) => {
        this.syncingCustomers = false;
        this.somethingWentWrong();
      }
    );
  }

  somethingWentWrong(): void {
    this.callToast.emit({
      title: "Something went wrong, please try again later",
      type: "failed",
    });
  }
}
