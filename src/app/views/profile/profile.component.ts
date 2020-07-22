import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Http } from "@angular/http";
import { ToasterService, Toast, ToasterConfig } from "angular2-toaster";
import { ColorsService } from "../../shared/colors/colors.service";
import { UserService } from "../../shared/users/user.service";
import * as S3 from "aws-sdk/clients/s3";
import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { ApiProvider } from "../../service/api";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent {
    @ViewChild('productImg',{static:false}) productImg: ElementRef;
    @ViewChild('confirmDlg',{static:false}) confirmDlg: ModalComponent;

  @Input() name: string;
  @Output() notify = new EventEmitter<any>();

  public companyName = "";
  public companyStreet = "";
  public companyCity = "";
  public companyState = "";
  public companyZipCode = "";
  public companyPhone = "";
  public companyFax = "";
  public firstName = "";
  public lastName = "";
  public email = "";
  public imgUrl = "";
  public err = "";
  public company: any;
  public passwordC = "";
  public password = "";
  public confirmPassword = "";
  fileContainer: any = null;
  selName: any = "";
  isUploading = false;

  public config: ToasterConfig = new ToasterConfig({
    positionClass: "toast-bottom-right"
  });
  //new api
  userdata: any;
  imageUrl = "";
  currentPassword = "";
  newPassword = "";
  imgurl = "";
  image: any;
  imagestored: any;
  displayName = "";
  isAdmin = null;

  constructor(
    public colors: ColorsService,
    public http: Http,
    private userInfo: UserService,
    private mdToast: ToasterService,
    public apiProvider: ApiProvider,
    public ele: ElementRef
  ) {
    this.companyName = userInfo.getUserInfo("companyName");
    this.companyStreet = userInfo.getUserInfo("companyStreet");
    this.companyZipCode = userInfo.getUserInfo("companyZipCode");
    this.companyPhone = userInfo.getUserInfo("companyPhone");
    this.companyFax = userInfo.getUserInfo("companyFax");
    this.company = userInfo.getUserInfo("company_data");
    this.userdata = JSON.parse(userInfo.getUserData("userInfo"));

    this.displayName = this.userdata["profile"]["displayName"];
    this.firstName = this.userdata["profile"]["firstName"];
    this.lastName = this.userdata["profile"]["lastName"];
    this.email = this.userdata["auth"]["email"];
    this.companyPhone = this.userdata["contact"]["phone"];
    this.companyCity = this.userdata["address"]["city"];
    this.companyState = this.userdata["address"]["state"];
    this.isAdmin = this.userdata["permissions"]["role"];
    this.imageUrl =
      this.userdata["profile"]["imageUrl"] == ""
        ? "assets/img/user_avatar.png"
        : this.userdata["profile"]["imageUrl"];
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
      reader.onload = function(e: any) {
        self.productImg.nativeElement.src = e.target.result;
      };
      reader.readAsDataURL(this.fileContainer.target.files[0]);
    }
  }

  uploadFile(container) {
    const file = container.target.files[0];
    const len = file.name.length;
    const fileName =
      JSON.parse(this.userInfo.getUserData("userInfo"))._id +
      "_" +
      Date.now() +
      file.name.substring(len - 4);
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData("token"));
    let param = new FormData();
    param.append("image", file);
    this.apiProvider.getImage(param).subscribe(data => {
      if ((data["status"] = "1")) {
        this.userdata["profile"]["imageUrl"] = data["imageUrl"];
        this.userInfo.setUserdata("token", this.apiProvider.apitoken);
        this.userInfo.setUserdata("userInfo", this.userdata);
        this.userInfo.updateProfilePicture();
        this.updateProfile();
      }
    });
  }

  onUpdateProfile() {
    this.err = "";
    if (this.firstName == "") {
      this.err = "Input valid first name!";
      return;
    }
    if (this.lastName == "") {
      this.err = "Input valid last name!";
      return;
    }
    if (this.selName) {
      this.uploadFile(this.fileContainer);
    } else {
      this.updateProfile();
    }
  }
  onUpdatePassword() {
    this.err = "";
    if (this.currentPassword == this.newPassword) {
      this.err = "Passwords do not match";
      return;
    }
    {
      this.updatePassword();
    }
  }
  updatePassword() {
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData("token"));
    let params = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    };
    this.apiProvider.changePassword(params).subscribe(response => {
      if (response["status"] == "1") {
        this.toast(response["message"], "success");
        this.confirmDlg.close();
      } else {
        this.toast(response["message"], "failed");
      }
    });
  }
  updateProfile() {
    //new api
    this.imagestored = this.userInfo.getUserData;
    this.apiProvider.apitoken = JSON.parse(this.userInfo.getUserData("token"));
    let params = {
      firstName: this.firstName,
      lastName: this.lastName,
      imageUrl: this.userdata["profile"]["imageUrl"]
    };
    this.apiProvider.updateProfile(params).subscribe(response => {
      if (response["status"] == "1") {
        this.toast(response["message"], "success");
        this.userdata["profile"]["firstName"] = this.firstName;
        this.userdata["profile"]["lastName"] = this.lastName;
        this.userInfo.setUserdata("token", this.apiProvider.apitoken);
        this.userInfo.setUserdata("userInfo", this.userdata);
        //this.profileImage.emit('imageUrl')
        // this.notify.emit('hello')
      } else {
        this.toast(response["message"], "failed");
      }
      // location.reload();
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
      accessKeyId: "AKIAJVPWQELHLN6GO5RA",
      secretAccessKey: "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",
      region: "us-east-2"
    });
    const bucketFilePath = filePath.substr(49);
    const params = {
      Bucket: "nortonfitness",
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