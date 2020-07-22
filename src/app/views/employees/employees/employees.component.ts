import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/users/user.service';
import { ApiProvider } from '../../../service/api';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employeesList: any;
  employeesData: any;
  searchOpt: any = {
    name: '',
  };
  listTableHeads = ['No', 'Employees'];
  listTitle: string = 'Employees List';
  userdata;
  role;
  constructor(
    private userInfo: UserService,
    private mdToast: ToasterService,
    public apiProvider: ApiProvider,
    private router: Router
  ) { }

  ngOnInit() {
    this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
    this.role = this.userdata['permissions']['role'];
    this.getEmployeesList();
  }

  getEmployeesList() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getAllEmployee().subscribe((employees: any) => {
      this.employeesList = employees.employees;
      this.employeesData = employees.employees;
      this.listTitle = `Employees List (${this.employeesList.length})`;
      console.log(this.employeesList);
    });
  }

  filterSearch() {
    let list = [];
    this.employeesData.map(item => {
      if (this.searchOpt.name.length > 0 && item.profile.displayName.toLowerCase().indexOf(this.searchOpt.name.toLowerCase())) {
        return;
      }
      list.push(item);
    });
    return list;
  }

  updateSearch(event) {
    this.searchOpt = event;
    this.employeesList = this.filterSearch();
  }

  onCreateEmployee() {
    this.router.navigate(['/newuser']);
  }
}
