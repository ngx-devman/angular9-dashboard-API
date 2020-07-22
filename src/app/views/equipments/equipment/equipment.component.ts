import { Component, ViewChild, ElementRef, } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute} from '@angular/router';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../../shared/colors/colors.service';
import { UserService } from '../../../shared/users/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../shared/storage/storage.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import * as S3 from 'aws-sdk/clients/s3';
import { Location } from '@angular/common';
import { ApiProvider } from '../../../service/api';
import { Renderer2 } from '@angular/core';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent {
    @ViewChild('equipmentDlg',{static:false}) equipmentDlg: ModalComponent;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;  
    @ViewChild('fileInput',{static:false}) fileInput: ElementRef;
    @ViewChild('productImg',{static:false}) productImg: ElementRef;

    isUploading = false;
    fileContainer: any = null;
    selName: any = '';
    public equipList: Array<any> = [];
    public config: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });
    model: any;
    equipmentTypeId: any;
    equipmentBrandId: any;
    customerId: any;
    imageUrl: '';
    serialNumber: any;
    nfcTag: any;
    equipmentData: any;
    customerdata: any;
    cust_Id: any;
    industryData: any;
    title: any;
    type_id: any;
    Brands: any;
    brand_Id: any;
    public firstName = '';
    public lastName = '';
    userdata: any;
    imagestored: any;
    customer_Id: any;
    customer_id: any
    searchOpt: any = {
        brandname: '',
        typename:'',
        modelname:''
    };
    editable:any;
    customer_name:any;
    public brandList: Array<any> = [];
    public equipmentList: Array<any> = [];
    public typeList: Array<any> = [];
    private isSide: boolean = false;

    constructor(
        public colors: ColorsService,
        public http: Http,
        private route: ActivatedRoute,
        private userInfo: UserService,
        private mdToast: ToasterService,
        private location: Location,
        public apiProvider: ApiProvider,private render:Renderer2,
    ) {

        this.getCustomer('true', 'false');    
        this.getIndustry();
        this.getBrand();
        this.getAllEmployee();
        this.userdata = JSON.parse(userInfo.getUserData('userInfo'));
        this.firstName = this.userdata['profile']['firstName'];
        this.lastName = this.userdata['profile']['lastName'];
        this.imageUrl = this.userdata['profile']['profileImage'];
        this.getCustomerEquipment();
        this.userInfo.customer.subscribe(data =>{
            console.log("data",data)
            this.customer_name= data['customer'];
            this.customer_id = data['_id'];
        })
    }

    toggleSidebar() {
        var x = document.getElementsByClassName("custom-sidebar");
        console.log(x)
        if(x){
            x[0].classList.remove("custom-sidebar");
        }
        document.getElementById("mySidebar").style.display = "block";
    }

    w3_close() {
        //document.getElementById("mySidebar").style.display = "none";
          var x = document.getElementsByClassName("w3-sidebar");
        console.log(x)
        if(x){
            x[0].className +=" custom-sidebar";
        }
        //document.getElementById("mySidebar").style.display = "none";
    }
  
    
  //toggleSidebar() {
    //   console.log("render ");
    // //this.render.setElementClass("body","aside-menu-show",true);
    // //this.render.addClass(event.target,"show");

    // this.isSide = !this.isSide;
    // var x = document.getElementsByClassName("aside-menu-fixed");
    // console.log(x)
    // if(this.isSide){
    //     x[0].className += ' aside-menu-show'
    // }else{
    //     //x[0].className += ' aside-menu-show'
    //     x[0].classList.remove("aside-menu-show");
    // }
    // this.userInfo.menuStatus.subscribe(() =>{
    //     console.log("slide")
    //     this.isSide = false;
    // })
//}
    getAllEmployee(){
        this.apiProvider.getAllEmployee().subscribe(response=>{
            console.log("All employee",response['employees'])
            if (response['status'] == '1') {
                this.customerdata = response['employees']
            }
        })
    }

    getCustomerEquipment() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            customerId: this.customer_id
        }
        this.apiProvider.getCustomerEquipment(params).subscribe(response => {
            console.log("get equipment33333333333",response)
            this.equipmentData = response['equipments'];
            this.equipmentList=this.equipmentData;
        })
    }
    getCustomer(includeActive, includeNonActive) {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            includeActive: includeActive,
            includeNonActive: includeNonActive,
        }
        this.apiProvider.getCustomer(params).subscribe(response => {
            if (response['status'] == '1') {
                this.customerdata = response['customers']
            }
        })
    }
    getIndustry() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            title: this.title,
        }
        this.apiProvider.getEquipmentTypes(params).subscribe(response => {
            console.log("Industry data",response)
            this.industryData = response['types'];
            this.typeList =this.industryData;
        })
    }
    getBrand() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let params = {
            title: this.title
        }
        this.apiProvider.getEquipmentBrand(params).subscribe(response => {
            if (response['status'] == '1') {
                this.Brands = response['brands'];
                this.brandList=this.Brands
            }
        })
    }

    selectCustomer(name) {
        var id = this.customerdata.find(x => x.info.name == name);
        this.cust_Id = id._id;
    }
    selectBrand(name) {
        var id = this.Brands.find(x => x.title == name);
        this.brand_Id = id._id;
    }
    selectType(name) {
        var id = this.industryData.find(x => x.title == name);
        this.type_id = id._id;
    }
    selectEmployee(){

    }

    addBrand(event: any) {

    }
    addequipment(event: any) {

    }
    addCustomer(event: any) {

    }
    addEmployee(event:any){

    }
    onDetailImg(url) {
        var image = new Image();
        image.src = url;
        var w = window.open("");
        w.document.write(image.outerHTML);
    }

    filterSearch() {
        let list = [];
        this.equipmentData.map(item => {
            // if (this.searchOpt.type != 'All' && this.searchOpt.type != item.type) {
            //     return;
            // }

            if (this.searchOpt.brandname.length > 0 && item.brand.title.toLowerCase().indexOf(this.searchOpt.brandname.toLowerCase()) == -1) {
                return;
            }

            if (this.searchOpt.typename.length > 0 && item.type.title.toLowerCase().indexOf(this.searchOpt.typename.toLowerCase()) == -1) {
                return;
            }
            if (this.searchOpt.modelname.length > 0 && item.info.model.toLowerCase().indexOf(this.searchOpt.modelname.toLowerCase()) == -1) {
                return;
            }
            list.push(item);
        });

        return list;
    }
    onChangeSearchValue(typename, value) {
        if (value) {
            // this.searchOpt[modelname] = value;
            // this.searchOpt[brandname] = value;
            this.searchOpt[typename] = value;
            console.log("equipment filter",this.searchOpt[typename])
        }
        // Do Search function..
        // this.typeList = this.filterSearch();
        // this.brandList = this.filterSearch();
        this.equipmentList = this.filterSearch();
        console.log("equipment list ",this.equipmentData)
        // this.equipmentList=[this.typeList,this.brandList]
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
        const fileName = JSON.parse(this.userInfo.getUserData('userInfo'))._id + "_" + Date.now() + file.name.substring(len - 4);

        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let param = new FormData();
        param.append('image', file);
        this.apiProvider.getImage(param).subscribe(data => {
            if (data['status'] = '1') {
                this.userdata['profile']['profileImage'] = data['imageUrl'];
                this.userInfo.setUserdata('token', this.apiProvider.apitoken)
                this.userInfo.setUserdata('userInfo' ,this.userdata)
                this.addEquipmentToServer();
            }
        });
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
    addEquipmentToServer() {
        this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
        let param = {
            model: this.model,
            equipmentTypeId: this.type_id,
            equipmentBrandId: this.brand_Id,
            customerId: this.cust_Id,
            imageUrl: this.userdata['profile']['profileImage'],
            serialNumber: this.serialNumber,
            nfcTag: this.nfcTag,
        }
        this.apiProvider.createCustomerEquipment(param).subscribe(response => {
            console.log("equipment33333333333",response)
            if (response['status'] == '1') {
                this.toast(response['message'], "success");
                this.getCustomerEquipment();
            }
            else {
                this.toast(response['message'], "failed");
            }
        })
    }

    onChangeValue(type, value) {
        // if (value) {
        //     this.searchOpt[type] = value;
        // }
        // Do Search function..
        this.equipList = this.filterSearch();
    }

    onConfirmEquipment() {
        this.isUploading = true;

        if (this.selName) {
            this.uploadFile(this.fileContainer);
        } else {
            // this.addEquipmentToServer(this.equipmentInfo.imgUrl,this.equipmentInfo.imgUrl1);
            this.addEquipmentToServer();
        }

        this.equipmentDlg.close();
    }
    onCreateEquipment() {
        this.equipmentDlg.open();
    }
    onCancelEquipment() {
        this.equipmentDlg.close();
    }

    onReportEquipment(idx) {
        this.equipmentDlg.open();
    }

    public myListFormatter(data: any): string {
        return data['name'];
    }

    formatDate(date) {
        let time = new Date(date);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hr: any = time.getHours();
        let min: any = time.getMinutes();
        let pm = 'AM';
        if (hr > 11) {
            pm = 'PM';
            hr = hr == 12 ? hr : hr - 12;
        }
        hr = hr > 9 ? '' + hr : '0' + hr;
        min = min > 9 ? '' + min : '0' + min;
        let dateStr = month + "/" + day + "/" + year + " " + hr + ":" + min + " " + pm;
        return dateStr;
    }

    public toast(text, type) {
        var toast: Toast = {
            type: type,
            title: text,
            showCloseButton: true
        };
        this.mdToast.pop(toast);
    }
    goBack() {
        this.location.back();
    }
}
