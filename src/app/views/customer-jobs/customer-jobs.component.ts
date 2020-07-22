import { Component, OnInit } from "@angular/core";
import { ApiProvider } from "../../service/api";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-customer-jobs",
  templateUrl: "./customer-jobs.component.html",
  styleUrls: ["./customer-jobs.component.scss"],
})
export class CustomerJobsComponent implements OnInit {
  customerId: string;
  jobsList: Array<any> = [];
  jobsListData: Array<any> = [];
  listTitle: string = "Customer Jobs";
  listTableHeads = [
    "Job ID", "Status", "Technician", "Customer", "Type", "Schedule", "Time", "Options"
  ];
  searchJobs: any;

  constructor(private apiProvider: ApiProvider, private route: ActivatedRoute) {
    this.customerId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.apiProvider
      .getJob()
      .subscribe((res: { status: number; jobs: any[] }) => {
        if (res.status === 1) {
          try {
            // Short Fix, should be handled using api
            this.jobsList = [...res.jobs].filter(
              (job) => job.customer._id === this.customerId
            );
            this.jobsListData = [...this.jobsList];
          } catch (error) {
            // handle exception here
          }
        } else {
          // toast with network error or something
        }
      });
  }

  updateSearch(event) {
    this.searchJobs = event;
    this.jobsList = this.filterJobs();
  }

  filterJobs() {
    let list = [];
    this.jobsListData.map((item) => {
      if (
        this.searchJobs.name.length > 0 &&
        item.customer.type.item
          .toLowerCase()
          .indexOf(this.searchJobs.name.toLowerCase()) == -1
      ) {
        return;
      }
      list.push(item);
    });
    return list;
  }
}
