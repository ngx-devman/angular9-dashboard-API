import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { ToasterService, Toast, ToasterConfig } from 'angular2-toaster';
import { ColorsService } from '../../shared/colors/colors.service';
import { UserService } from '../../shared/users/user.service';
import { EnvVariables } from '../../service/env-variables';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/storage/storage.service';
import * as S3 from 'aws-sdk/clients/s3';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ApiProvider } from '../../service/api';
@Component({
  selector: 'app-company-equipment',
  templateUrl: './company-equipment.component.html',
  styleUrls: ['./company-equipment.component.scss']
})
export class CompanyEquipmentComponent implements OnInit {

  @ViewChild('equipmentDlg',{static:false}) equipmentDlg: ModalComponent;
  @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;
  @ViewChild('fileInput',{static:false}) fileInput: ElementRef;
  @ViewChild('productImg',{static:false}) productImg: ElementRef;

  public config: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right'
});
  model:any;
  serialNumber:any;
  typeId:any;
  brandId:any;
  imageUrl:any;
  nfcTag:any;
  qrCode:any;
  equipData:any;
  userdata:any;
  industryData:any;
  Brands:any;
  isUploading = false;
  fileContainer: any = null;
  selName: any = '';
  title:any;
  brand_Id: any;
  type_Id: any;
  constructor(  
    public colors: ColorsService,
    public http: Http,
    private router: Router,
    private userInfo: UserService,
    private storage: StorageService,
    private mdToast: ToasterService,
    public apiProvider: ApiProvider) { 
      this.getIndustry();
      this.getBrand();        
      this.getCompanyEquipment()
      this.userdata = JSON.parse(userInfo.getUserData('userInfo'));
      this.imageUrl = this.userdata['profile']['profileImage'];
     
    }

  ngOnInit() {
  }
  getCompanyEquipment(){
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    this.apiProvider.getCompanyEquipment().subscribe(response =>{
      console.log("company equ",response)
      if(response['status']=='1'){
        this.equipData =response['companyEquipments'];
      }
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
        }
    })
}
getIndustry() {
  this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
  let params = {
      title: this.title,
  }
  this.apiProvider.getEquipmentTypes(params).subscribe(response => {
      this.industryData = response['types'];
  })
}
addBrand(event: any) {

}
addequipment(event: any) {

}
  addEquipmentToServer(){
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    let param={
      model:this.model,
      serialNumber:this.serialNumber,
      typeId:this.type_Id,
      brandId:this.brand_Id,
      imageUrl:this.userdata['profile']['profileImage'],
      nfcTag:this.nfcTag,
      qrCode:this.qrCode
    }
    console.log("param",param)
    this.apiProvider.createCompanyEquipment(param).subscribe( response =>{
      debugger;
      console.log("company equ",response)
      if (response['status'] == '1') {
        this.toast(response['message'], "success");
        this.getCompanyEquipment();   
    }else {
      this.toast(response['message'], "failed");
    }
    })
  }
  onCreateEquipment() {
    this.equipmentDlg.open();
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
          this.userInfo.setUserdata('token', this.apiProvider.apitoken);
          this.userInfo.setUserdata('userInfo' ,this.userdata);
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
selectType(name) {
  var id = this.industryData.find(x => x.title == name);
  this.type_Id = id._id;
  console.log("type/_id",this.type_Id)
}
selectBrand(name) {
  var id = this.Brands.find(x => x.title == name);
  this.brand_Id = id._id;
  console.log("brand_id",this.brand_Id)
}
onCancelEquipment() {
  this.equipmentDlg.close();
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
