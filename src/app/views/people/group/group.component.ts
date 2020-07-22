import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { Router } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ApiProvider } from '../../../service/api';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent {
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
    @ViewChild('groupDlg',{static:false}) groupDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    list: any = [];
    title: any;
    groupData: any;
    public groupList: Array<any> = [];
    searchOpt: any = {
        name: '',
    };
    member: any;
    manager: any;
    group_Id: any;
    groupName: any;
    isRole:any;
    userdata:any;
    constructor(
        public colors: ColorsService,
        public http: Http,
        private router: Router,
        private userInfo: UserService,
        private mdToast: ToasterService,
        private apiProvider: ApiProvider
    ) {
        this.getGroups();
        this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
    this.isRole = this.userdata['permissions']['role'];
    }

    getGroups() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
        this.apiProvider.getGroups().subscribe(response => {
            console.log("Get Group  Response", response);
            if (response['status'] == 1) {
                this.groupData = response['groups'];
                this.groupList = this.groupData;
            }
        })
    }
    onCreateGroup() {
        this.groupDlg.open();
    }
    onConfirmAdd() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
        let param = {
            title: this.title
        }
        this.apiProvider.createGroup(param).subscribe(response => {
            console.log("Group  Response", response);
            if (response['status'] == 1) {
                this.toast(response['message'], "success");
                this.getGroups();
            } else {
                this.toast(response['message'], "Failed");
            }
        })
        this.groupDlg.close();
    }

    onCancelAdd() {
        this.groupDlg.close();
    }
    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };
        this.mdToast.pop(toast);
    }
    filterSearch() {
        let list = [];
        this.groupData.map(item => {
            if (this.searchOpt.name.length > 0 && item.title.toLowerCase().indexOf(this.searchOpt.name.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });
        return list;
    }
    onChangeSearchValue(name, value) {
        if (value) {
            this.searchOpt[name] = value;
        }
        this.groupList = this.filterSearch();
    }
    Delete(_id) {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
        let param = {
            groupId: _id
        }
        this.apiProvider.deleteGroup(param).subscribe(response => {
            console.log(" Delete Group  Response", response);
            if (response['status'] == 1) {
                this.toast(response['message'], "success");
                this.getGroups();
            }
        })
    }
    onMembers(item, index) {
        console.log("_ddddddd", item)
        this.member = item['members'];
        this.manager = item['manager']
        this.group_Id = item['_id'];
        this.groupName = item['title']
        console.log("Gorup name", this.groupName)
        console.log("member111111", this.member)
        console.log("manager44444", this.manager)
        this.router.navigate(['/main/group-manager'], {
            queryParams: { "manager": JSON.stringify(this.manager), "members": JSON.stringify(this.member), "index": index, "id": this.group_Id, "groupName": this.groupName },
            skipLocationChange: true
        });
    }
}