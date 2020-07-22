import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute} from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ApiProvider } from '../../service/api';
@Component({
    selector: 'app-group-manager',
    templateUrl: './group-manager.component.html',
    styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent {

    @ViewChild('addManagerDlg',{static:false}) addManagerDlg: ModalComponent;
    @ViewChild('addMemberDlg',{static:false}) addMemberDlg: ModalComponent;
    @ViewChild('deleteDlg',{static:false}) deleteDlg: ModalComponent;
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
    //new api
    groupList: any;
    group_Id: any;
    groupData: any;
    manager_id: any;
    managerData: any;
    technicianData: any;
    member_id: any;
    member: any;
    manager: any;
    managerId: any;
    memberId: any;
    index: any;
    groupName: any;
    editable:any;

    constructor(
        public colors: ColorsService,
        public http: Http,
        private route: ActivatedRoute,
        private userInfo: UserService,
        private mdToast: ToasterService,
        public apiProvider: ApiProvider
    ) {
        this.index = this.route.snapshot.queryParams["index"];
        this.group_Id = this.route.snapshot.queryParams["id"]
        console.log(this.group_Id);
        this.groupName = this.route.snapshot.queryParams["groupName"]
        console.log("Group name", this.groupName)
        console.log(this.member)
        console.log(this.manager)
        this.getTechnician();
        this.getManager();
        this.getGroups();
    }
    bindMembers(manager, member) {

        console.log("Manager", manager);

        console.log("Member", member);

        this.groupList = member;

        if(manager != undefined){
            this.groupList.push(manager);
        }
        
        
        console.log("GROUP LIST ", this.groupList);
    }
    getManager() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.apiProvider.getManager().subscribe(response => {
            if (response['status'] == '1') {
                console.log("Get manager Response", response);
                this.managerData = response['users'];
            }
        })
    }
    getGroups() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'))
        this.apiProvider.getGroups().subscribe(response => {
            console.log("Get Group  Response", response);
            if (response['status'] == 1) {
                this.groupData = response['groups'];
                console.log("Group Data");
                console.log(this.groupData);
                console.log(this.index);
                this.bindMembers(this.groupData[this.index]['manager'], this.groupData[this.index]['members']);
            }
        })
    }
    getTechnician() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.apiProvider.getTechnician().subscribe(response => {

            console.log("Get techncain  Response", response);
            if (response['status'] == '1') {
                this.technicianData = response['users'];
            }
        })
    }

    onCreateManager() {
        this.addManagerDlg.open()
    }
    onConfirmManager() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let param = {
            groupId: this.group_Id,
            managerId: this.manager_id
        }
        this.apiProvider.addGroupManager(param).subscribe(response => {
            console.log("manager addd", response)
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
                this.getGroups();
            }
            this.addManagerDlg.close();
        })
    }
    onCancelManager() {
        this.addManagerDlg.close();
    }
    addManager(event: any) {}
    addMember(event: any) {}

    selectManager(name) {
        console.log(name);
        var id = this.managerData.find(x => x.profile.displayName == name);
        this.manager_id = id._id;
        console.log("manager_id", id._id);
    }
    selectMember(name) {
        console.log(name);
        var id = this.technicianData.find(x => x.profile.displayName == name);
        this.member_id = id._id;
        console.log("member_id", id._id);
    }
    onCreateMember() {
        this.addMemberDlg.open();
    }
    onConfirmMember() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let param = {
            groupId: this.group_Id,
            memberId: this.member_id
        }
        this.apiProvider.addGroupMember(param).subscribe(response => {
            console.log("memberaddd", response)
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
                this.getGroups();
            } else {
                this.toast(response['message'], "success");
            }
            this.addMemberDlg.close();
        })
    }
    onCancelMember() {
        this.addMemberDlg.close();
    }
    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };
        this.mdToast.pop(toast);
    }
    Opendelete() {
        this.deleteDlg.open();
    }
    onCancel() {
        this.deleteDlg.close();
    }
    onDeleteGroup(member_id) {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let param = {
            groupId: this.group_Id,
            memberId: member_id
        }
        this.apiProvider.removeMember(param).subscribe(response => {
            console.log("memberremover", response);
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
                this.getGroups();
            } else {
                this.toast(response['message'], "success");
            }
        })
    }
}