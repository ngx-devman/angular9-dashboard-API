import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ApiProvider } from '../../../service/api';
import { CancelModalComponent } from '../cancel-modal/cancel-modal.component';
import { UserService } from '../../users/user.service';

@Component({
  selector: 'app-default-model',
  templateUrl: './default-model.component.html',
  styleUrls: ['./default-model.component.scss']
})
export class DefaultModelComponent implements OnInit {
  fileContainer: any = null;
  selName: any = '';
  @ViewChild('productImg',{static:false}) productImg: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public inputData:any,
    public dialog:MatDialogRef<DefaultModelComponent>,
    private apiProvider:ApiProvider,
    public dialogs: MatDialog,
    private userInfo:UserService
  ) { }

  ngOnInit() {
    console.log(this.inputData);
  }
  
  addNew(){
    if(!this.inputData.dataValues.updateJob){
      let data = {...this.inputData, createNew: true};
      this.dialog.close({data});
    } else{
      let data = {...this.inputData, job: 'update'};
      this.dialog.close({data});
    }
    
  }

  close(){
    let data = {...this.inputData.dataValues.data, createNew: false};
    this.dialog.close({data});
  }

  closed(event){
    this.dialog.close(event); 
  }

  updateCustomer(event){
    this.inputData.dataValues.selectedCustomer = event;
    this.getCustomerEquipment();
  }

  getCustomerEquipment(){
    let params = {
      customerId: this.inputData.dataValues.selectedCustomer
    }
    this.apiProvider.getCustomerEquipment(params).subscribe((equipments:any) => {
      if(equipments.status == 1){
        this.inputData.dataInputs.customEquipment = this.autoCompleteEquipments(equipments.equipments);
      }
    });
  }

  autoCompleteEquipments(list){
    let newList = [];
    list.map(l => {
        newList.push(this.autoComplet(l._id, l.title));
    });
    return newList;  
  }

  acceptContract(contract){
    this.inputData.dataValues.newContract = contract;
    this.inputData.dataValues.acceptContract = true;
    this.inputData.dataValues.rejectContract = false;
    let data = {...this.inputData, createNew: true};
    this.dialog.close({data});
  }

  rejectContract(contract){
    this.inputData.dataValues.newContract = contract;
    this.inputData.dataValues.acceptContract = false;
    this.inputData.dataValues.rejectContract = true;
    let data = {...this.inputData, createNew: true};
    this.dialog.close({data});
  }

  autoComplet(id, name){
    let a = {
        id: id,
        name: name
    }
    return a;
  }

  cancelJob(){
    const dialogRef = this.dialogs.open(CancelModalComponent, {
      width: '300px',
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe((data:boolean) =>{
      if(data){
        let data = {...this.inputData, job:'cancel'};
        this.dialog.close({data});
      } else{
        this.close();
      }
    });
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
    // const len = file.name.length;
    // const fileName = this.userInfo.getUserInfo('id') + "_" + Date.now() + file.name.substring(len - 4);
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData('token'));
    let param = new FormData();
    param.append('image', file);
    this.apiProvider.getImage(param).subscribe((imageData:any) => {
        console.log('this is upload image response: ', imageData)
        if (imageData['status'] = '1') {
          this.inputData.dataValues.data.details.profile.imageUrl = imageData.imageUrl;
          let data = {...this.inputData.dataValues.data, createNew: true};
          this.dialog.close({data});
        }
    }, (err) => {
        console.log('getImage Error: ', err)
    });
  }

  updateProfile(){
    console.log(this.fileContainer);
    if(this.fileContainer){
      this.uploadFile(this.fileContainer);
    } else{
      let data = {...this.inputData.dataValues.data, createNew: true};
      this.dialog.close({data});
    }
  }

  public validatePassword(){
    if(this.inputData.dataValues.data.newPassword != ''){
      if(this.inputData.dataValues.data.newPassword == this.inputData.dataValues.data.confirmPassword){
        return false;
      } else{
        return true;
      }
    }
    return true;
  }

  updateCharges(type){
    console.log(type);
    console.log(this.inputData.dataInputs.jobCharges);
    if(this.inputData.dataInputs.jobCharges.jobCharges.length > 0){
      this.inputData.dataInputs.jobCharges.jobCharges.map(charges => {
        if(charges.jobType){
          if(charges.jobType._id == type){
            console.log(charges);
            this.inputData.dataValues.isFixed = charges.isFixed;
            this.inputData.dataValues.charges = charges.charges;
          }
        }
      });
    }
  }

}
