import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import * as S3 from 'aws-sdk/clients/s3';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ApiProvider } from '../../service/api';

@Component({
    selector: 'app-company-profile',
    templateUrl: './company-profile.component.html',
    styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent {
    @ViewChild('productImg',{static:false}) productImg: ElementRef;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
    public companyName = '';
    public companyStreet = '';
    public companyCity = '';
    public companyState = '';
    public companyZipCode = '';
    public companyPhone = '';
    public companyFax = '';
    public firstName = '';
    public lastName = '';
    public email = "";
    public imgUrl = '';
    public err = "";
    companyEmail:string = '';
    public company: any;
    fileContainer: any = null;
    selName: any = '';
    isUploading = false;
    companyData: any;
    logoUrl = '';
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });

    constructor(
        public colors: ColorsService,
        public http: Http,
        private router: Router,
        private userInfo: UserService,
        private storage: StorageService,
        private mdToast: ToasterService,
        public apiProvider: ApiProvider
    ) {
        //new api
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        this.companyData = JSON.parse(userInfo.getUserData('company'));
        console.log("company Data", this.companyData);
        this.firstName = this.companyData['info']['companyName'];
        this.lastName = this.companyData['info']['companyName'];
        this.companyName = this.companyData['info']['companyName'];
        this.logoUrl = this.companyData['info']['logoUrl'] ? this.companyData['info']['logoUrl']: "assets/img/user_avatar.png";
        this.companyStreet = this.companyData['address']['street'];
        this.companyCity = this.companyData['address']['city'];
        this.companyState = this.companyData['address']['state'];
        this.companyZipCode = this.companyData['address']['zipCode'];
        this.companyPhone = this.companyData['contact']['phone'];
        this.companyFax = this.companyData['contact']['fax'];
        this.companyEmail = this.companyData['info']['companyEmail'];
    }

    chooseFile(container) {
        if (container.target.files.length == 0) {
            return;
        }
        this.fileContainer = container;
        this.selName = container.target.files[0].name;
        this.readImgContent();
    }

    readImgContent() {
        if (this.fileContainer.target.files && this.fileContainer.target.files[0]) {
            var reader = new FileReader();
            let self = this;
            reader.onload = function (e: any) {
                self.productImg.nativeElement.src = e.target.result;
            }
            reader.readAsDataURL(this.fileContainer.target.files[0]);
        }
    }

    uploadFile(container) {
        const file = container.target.files[0];
        const len = file.name.length;
        const fileName = this.userInfo.getUserInfo('id') + "_" + Date.now() + file.name.substring(len - 4);
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let param = new FormData();
        param.append('image', file);
        param.append('companyId', JSON.parse(this.userInfo.getUserData('company'))._id)
        console.log('this company id: ', JSON.parse(this.userInfo.getUserData('company'))._id)
        this.apiProvider.getImage(param).subscribe(data => {
            console.log('this is upload image response: ', data)
            if (data['status'] = '1') {
                this.companyData['info']['logoUrl'] = data['imageUrl'];
                this.userInfo.setUserdata('token', this.apiProvider.apitoken);
                this.userInfo.setUserdata('company', this.companyData)

                this.updateProfile()
            }
        }, (err) => {
            console.log('getImage Error: ', err)
        });
    }

    onUpdateProfile() {
        this.err = '';
        if (this.firstName == '') {
            this.err = 'Input valid first name!';
            return;
        }
        if (this.lastName == '') {
            this.err = 'Input valid last name!';
            return;
        }
        if (this.selName) {
            this.uploadFile(this.fileContainer);
        }
        else {
            this.updateProfile();
        }
    }

    updateProfile() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            logoUrl: this.logoUrl,
            companyName: this.companyName,
            companyEmail: this.companyEmail,
            street: this.companyStreet,
            city: this.companyCity,
            state: this.companyState,
            zipCode: this.companyZipCode,
            phone: this.companyPhone,
            fax: this.companyFax,
        }
        
        let updateCompany = {...this.companyData};

        updateCompany.info.companyName = this.companyName;
        updateCompany.address.street = this.companyStreet;
        updateCompany.address.city = this.companyCity;
        updateCompany.address.state = this.companyState;
        updateCompany.address.zipCode = this.companyZipCode;
        updateCompany.contact.phone = this.companyPhone;
        updateCompany.address.fax = this.companyFax;
        updateCompany.info.companyEmail = this.companyEmail;
        console.log('this is update params: ', params);
        this.apiProvider.updateCompanyProfile(params).subscribe(response => {
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
                console.log(this.companyCity);
                console.log(updateCompany);
                this.userInfo.setUserdata('token', this.apiProvider.apitoken);
                this.userInfo.setUserdata('company', updateCompany);
            } else {
                this.toast(response['message'], "failed");
            }
        })
    }

    deleteFile(filePath) {
        if (filePath == undefined) {
            return;
        }
        if (filePath.length < 45) {
            return;
        }
        const bucket = new S3({
            accessKeyId: 'AKIAJVPWQELHLN6GO5RA',
            secretAccessKey: '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',
            region: 'us-east-2'
        });

        const bucketFilePath = filePath.substr(49);
        const params = {
            Bucket: 'nortonfitness',
            Key: bucketFilePath
        };

        bucket.deleteObject(params, (err, data) => {
            if (err) {
                this.isUploading = false;
            } else {
            }
        });
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
