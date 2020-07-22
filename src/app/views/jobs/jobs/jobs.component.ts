import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/users/user.service';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ApiProvider } from '../../../service/api';
import { MatDialog } from '@angular/material';
import { DefaultModelComponent } from '../../../shared/components/default-model/default-model.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobsList: any;
  jobsData: any;
  searchOpt: any = {
    name: '',
  };
  listTableHeads = ['No', 'Job Types'];
  listTitle: string = 'Job Types';
  userdata;
  role;
  title: any;
  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
  });
  constructor(
    private userInfo: UserService,
    private mdToast: ToasterService,
    public apiProvider: ApiProvider,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
    this.role = this.userdata['permissions']['role'];
    this.getJobsList();
  }

  getJobsList() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getJobType().subscribe((jobs: any) => {
      this.jobsList = jobs.types;
      this.jobsData = jobs.types;
      this.listTitle = `Job Types (${this.jobsList.length})`;
      console.log(this.jobsList);
    });
  }

  filterSearch() {
    let list = [];
    this.jobsData.map(item => {
      if (this.searchOpt.name.length > 0 && item.title.toLowerCase().indexOf(this.searchOpt.name.toLowerCase())) {
        return;
      }
      list.push(item);
    });
    return list;
  }

  updateSearch(event) {
    this.searchOpt = event;
    this.jobsList = this.filterSearch();
  }

  onCreateJobType() {
    let dataValues = {
      title: 'Add Job Type',
      status: 'jobType',
      newJob: '',
      cusHeight: false
    }
    let dataInputs = {
      jobLabel: 'Job Type'
    }

    let data = {
      dataInputs: dataInputs,
      dataValues: dataValues
    }
    const dialogRef = this.dialog.open(DefaultModelComponent, {
      width: '474px',
      data: data,
      panelClass: 'defaultModel'
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      console.log(response);
      if (response.data.createNew) {
        this.title = response.data.dataValues.newJob;
        this.addJobTypeToServer();
      }
    });
  }

  addJobTypeToServer() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));

    let params = {
      title: this.title,
    }
    /// new api
    this.apiProvider.createJobType(params).subscribe(response => {
      console.log(response);
      if (response['status'] == "1") {
        this.toast(response['message'], "success");
        this.getJobsList();
      } else {
        this.toast(response['message'], "failed");
      }
    })
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
