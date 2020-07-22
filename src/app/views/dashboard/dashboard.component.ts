import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Color, Label } from "ng2-charts";
import { UserService } from "../../shared/users/user.service";
import { ApiProvider } from "../../service/api";
import { MatDialog } from '@angular/material';
import { DefaultModelComponent } from '../../shared/components/default-model/default-model.component';
import { Router } from '@angular/router';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit{
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            max: 20,
            stepSize: 5
          },
          gridLines: {
            drawBorder: false,
            color: "#eee"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
            display: false,
            drawBorder: false
          }
        }
      ]
    }
  };

  public lineChartOptions: ChartOptions = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          display: false
        }
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
            display: false,
            drawBorder: false
          },
          ticks: {
            fontColor: "white",
            fontStyle: "bold",
            fontSize: 13
          }
        }
      ]
    }
  };

  public barChartLabels;
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: any[] = [];

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels;

  MONTHS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  public lineChartColors: Color[] = [
    {
      borderColor: "white"
    }
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];
  public dummyUser =
    "https://www.tridentconsultant.com/wp-content/uploads/2019/07/user-dummy-200x200.png";

  public counts = {
    customers: "0",
    jobs: "0",
    reports: "0",
    technicians: "0",
    invoices: "0",
    inventories: "0",
    repaired: "0",
    others: "0",
    tickets: "0"
  };
  groupData: any = [];
  technicianData: any = [];
  jobsData: any = [];
  customerData: any = [];
  
  constructor(
    public apiProvider: ApiProvider, 
    private userInfo: UserService,
    public dialog: MatDialog,
    private router:Router
  ) {
    this.getTechnician();
    this.getGroups();
    this.getCustomer("true", "false");
    this.getJob();
    this.getInventories();
    this.getServiceTickets();
  }

  ngOnInit(){
    
  }

  getGroups() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData("token"));
    this.apiProvider.getGroups().subscribe(response => {
      if (response["status"] == 1) {
        this.groupData = response["groups"];
      }
    });
  }

  getTechnician() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData("token"));
    this.apiProvider.getTechnician().subscribe(response => {
      if (response["status"] == "1") {
        this.counts.technicians = response["users"].length;
        this.technicianData = response["users"].splice(0, 4);
        console.log(this.technicianData);
      }
    });
  }

  getCustomer(includeActive, includeNonActive) {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData("token"));
    let params = {
      includeActive: includeActive,
      includeNonActive: includeNonActive
    };
    this.apiProvider.getCustomer(params).subscribe(response => {
      if (response["status"] == "1") {
        this.counts.customers = response["customers"].length;
        this.customerData = response["customers"].splice(0, 4);
        console.log(this.customerData);
      }
    });
  }

  getJob() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData("token"));
    this.apiProvider.getJob().subscribe(response => {
      if (response["status"] == "1") {
        this.counts.jobs = response["jobs"].length;
        var jobs = window["_"].groupBy(response["jobs"], t => {
          var day = this.MONTHS[new Date(t.createdAt).getDay()];
          var date = new Date(t.createdAt).getDate();
          return `${day}, ${date}`;
        });

        this.barChartData.push({
          barPercentage: 0.5,
          barThickness: 6,
          radius: 10,
          hoverBorderColor: "#0182c3",
          hoverBackgroundColor: "#0182c3",
          maxBarThickness: 8,
          backgroundColor: "#0182c3",
          minBarLength: 2,
          data: Object.values(jobs).map(j => j["length"]),
          label: ""
        });

        this.barChartLabels = Object.keys(jobs);

        this.lineChartData.push({
          data: Object.values(jobs).map(j => j["length"])
        });

        this.lineChartLabels = Object.keys(jobs);
      }
    });
  }

  getServiceTickets(){
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
      this.apiProvider.getServiceTicket().subscribe(response => {
        console.log("serviceTicket", response);
        if (response['status'] == '1') {

          this.counts.tickets = response['serviceTickets'].length;
        }
      })
  }

  getInventories() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData("token"));
    this.apiProvider.InventoryReport().subscribe(response => {
      if (response["status"] == "1") {
        this.counts.inventories = response["companyEquipmentInventory"].length;
      }
    });
  }

  createTicket(){
    this.apiProvider.updateShowServiceTicket(true);
    this.router.navigate(['/schedule']);
  }

}
