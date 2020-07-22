import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ApiProvider } from '../../service/api';
import { MatDialog } from '@angular/material';
import { DefaultModelComponent } from '../../shared/components/default-model/default-model.component';

@Component({
    selector: 'app-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss']
})
export class TypeComponent {

    @ViewChild('typeDlg',{static:false}) typeDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    name: '';
    searchOpt: any = {
        name: '',
    };
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });

    //new api 
    title: any;
    industryData: any;
    public industryList: Array<any> = [];
    listTableHeads = ['No', 'Equipment Type'];
    listTitle:string = 'Equipment Types List';
    role:number = 0;
    userdata;
    constructor(
        public colors: ColorsService,
        public http: Http,
        private userInfo: UserService,
        private mdToast: ToasterService,
        public apiProvider: ApiProvider,
        public dialog: MatDialog
    ) {
        this.getIndustry();
    }
    getIndustry() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.userdata = JSON.parse(this.userInfo.getUserData('userInfo'));
        this.role = this.userdata['permissions']['role'];
        let params = {
            title: this.title,
        }
        this.apiProvider.getEquipmentTypes(params).subscribe(response => {
            if (response['status'] == '1') {
                this.industryData = response['types'];
                console.log(this.industryData)
                this.industryList = this.industryData;
            }
        })
    }

    filterSearch() {
        let list = [];
        this.industryData.map(item => {
            if (this.searchOpt.name.length > 0 && item.title.toLowerCase().indexOf(this.searchOpt.name.toLowerCase())) {
                return;
            }
            list.push(item);
        });
        return list;
    }

    addTypeToServer() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));

        let params = {
            title: this.title,
        }
        /// new api
        this.apiProvider.createEquipmentType(params).subscribe(response => {
            if (response['status'] == "1") {
                this.toast(response['message'], "success");
                this.getIndustry();
            } else {
                this.toast(response['message'], "failed");
            }
        })
    }

    onChangeSearchValue(name, value) {
        if (value) {
            this.searchOpt[name] = value;
        }
        // Do Search function..
        this.industryList = this.filterSearch();
    }

    onCreateType() {
        // this.typeDlg.open();
        let dataValues = {
            title: 'Add Equipment Type',
            status: 'equipment',
            newBrand: '',
            cusHeight: false
        }
        let dataInputs = {
            brandLabel: 'Equipment Type Name'
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
        dialogRef.afterClosed().subscribe((response:any) => {
            console.log(response);
            if(response.data.createNew){
                this.title = response.data.dataValues.newBrand;
                this.addTypeToServer();
            }
        });
    }

    onConfirmType() {
        this.addTypeToServer();
        this.typeDlg.close();
    }

    onCancelType() {
        this.typeDlg.close();
    }

    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };
        this.mdToast.pop(toast);
    }

    updateSearch(event){
        this.searchOpt = event;
        this.industryList = this.filterSearch();
    }

    
}
