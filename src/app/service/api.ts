import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { StorageService } from "../shared/storage/storage.service";
import { UserService } from "../shared/users/user.service";
import { userInfo } from "os";
import { Http2SecureServer } from "http2";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiProvider {
  Base_URL = "https://blueclerk-node-api.deploy.blueclerk.com/api/v1"; //"http://blueclerk-node-api.deploy.blueclerk.com:3006/api/v1";
  apitoken = "";
  singleSharedCustomer = new BehaviorSubject(null);
  showServiceTicket = new BehaviorSubject(null);
  appLoading = new BehaviorSubject(null);
  individualProfile = new BehaviorSubject(null);
  profileUpdated = new BehaviorSubject(null);
  invoiceDetail = new BehaviorSubject(null);
  // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAhohptKzKOOndCrj_6R-gIzYUfMQ3Gs-c
  decoding_URL = "https://maps.googleapis.com/maps/api/geocode/json";
  decoding_key = "AIzaSyAhohptKzKOOndCrj_6R-gIzYUfMQ3Gs-c";

  constructor(private http: HttpClient) {}
  getIndustry() {
    // let headers = new HttpHeaders({
    //     'Content-Type': 'application/json'
    // });
    // let options = {
    //     headers: headers
    // };
    return this.http.post(this.Base_URL + "/getIndustries", null);
  }

  signUp(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/signup", param, options);
  }

  signUpSocial(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "//signUpSocial", param, options);
  }

  checkAndGet(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/checkAndGet", param, options);
  }
  
  login(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/login", param, options);
  }

  agreeTermAndCondition(token) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: token //JSON.parse(this.userInfo.getUserData())
    });
    let options = {
      headers: headers
    };
    const param = {
      agreedStatus : true
    }
    return this.http.post(this.Base_URL + "/agreeTermAndCondition", param, options);
  }

  createEquipmentType(param) {
    //this.apitoken = JSON.parse(this.userInfo.getUserData());

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken //JSON.parse(this.userInfo.getUserData())
    });
    let options = {
      headers: headers
    };
    return this.http.post(
      this.Base_URL + "/createEquipmentType",
      param,
      options
    );
  }
  getEquipmentTypes(title) {
    let headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      Authorization: this.apitoken //JSON.parse(this.userInfo.getUserData())
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getEquipmentTypes", title, options);
  }
  createEquipmentBrand(title) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(
      this.Base_URL + "/createEquipmentBrand",
      title,
      options
    );
  }
  getEquipmentBrand(title) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(
      this.Base_URL + "/getEquipmentBrands",
      title,
      options
    );
  }
  createCustomer(data) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };

    return this.http.post(this.Base_URL + "/createCustomer", data, options);
  }
  getCustomer(param) {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/getCustomers", param, options);
  }
  getCustomerDetail(body: { customerId }) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken,
    });
    let options = {
      headers: headers,
    };
    return this.http
      .post(this.Base_URL + "/getCustomerDetail", body, options)
      .pipe(map((res: any) => res));
  }
  createManager(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/createManager", param, options);
  }
  getManager() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getManagers", null, options);
  }
  createTechnician(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/createTechnician", param, options);
  }
  getTechnician() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getTechnicians", null, options);
  }
  createOfficeAdmin(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/createOfficeAdmin", param, options);
  }
  getOfficeAdmin() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getOfficeAdmins", null, options);
  }
  updateProfile(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/updateProfile", param, options);
  }
  changePassword(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/changePassword", param, options);
  }
  updateCompanyProfile(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(
      this.Base_URL + "/updateCompanyProfile",
      param,
      options
    );
  }
  createJobType(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/createJobType", param, options);
  }
  getJobType() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getJobTypes", null, options);
  }
  createJob(params) {
    //     let headers = new HttpHeaders({
    //         // 'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
    //         'Content-Type':'application/json',
    //         "Authorization":this.apitoken
    //     })
    //     let options ={
    //         headers:headers
    //     };

    //     return this.http.post(this.Base_URL+"/createJob",param,options)
    // }
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };

    return this.http.post(this.Base_URL + "/createJob", params, options);
  }

  createServiceTicket(params){
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/createServiceTicket", params, options);
  }

  getJob() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getJobs", null, options);
  }

  getServiceTicket(){
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getServiceTickets", null, options);
  }

  getJobDetails(jobId) {
    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded", //'application/json',
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };

    let param = new HttpParams({
      fromObject: {
        jobId
      }
    });

    return this.http.post(this.Base_URL + "/getJobDetails", param, options);
  }

  getImage(param) {
    let headers = new HttpHeaders({
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/uploadImage", param, options);
  }
  createCustomerEquipment(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(
      this.Base_URL + "/createCustomerEquipment",
      param,
      options
    );
  }
  getCustomerEquipment(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(
      this.Base_URL + "/getCustomerEquipments",
      param,
      options
    );
  }
  createGroup(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/createGroup", param, options);
  }
  getGroups() {
    let headers = new HttpHeaders({
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getGroups", null, options);
  }
  deleteGroup(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/deleteGroup", param, options);
  }
  createCompanyEquipment(data) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };

    // let param = new FormData();
    // param.append('model',data.model);
    // param.append('serialNumber',data.serialNumber);
    // param.append('typeId',data.type_Id);
    // param.append('brandId',data.brand_Id);
    // param.append('imageUrl',data.imageUrl);
    // param.append('nfcTag',data.nfcTag);
    // param.append('street',data.street);
    // param.append('qrCode',data.qrCode);

    return this.http.post(
      this.Base_URL + "/createComapnyEquipment",
      data,
      options
    );
  }
  getCompanyEquipment() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(
      this.Base_URL + "/getCompanyEquipments",
      null,
      options
    );
  }
  updateJob(params) {
    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded", //'application/json',
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };

    let param = new HttpParams({
      fromObject: {
        jobId: params.jobId,
        status: params.status,
        comment: params.comment
      }
    });

    return this.http.post(this.Base_URL + "/updateJob", param, options);
  }
  Inventory(params) {
    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded", //'application/json',
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    let param = new HttpParams({
      fromObject: {
        dateTime: params.dateTime,
        nfcTags: params.nfcTags,
        qrCodes: params.qrCodes
      }
    });
    return this.http.post(this.Base_URL + "/takeInventory", param, options);
  }
  InventoryReport() {
    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded", //'application/json',
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };

    return this.http.post(this.Base_URL + "/getInventoryReport", null, options);
  }
  addGroupManager(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/addGroupManager", param, options);
  }
  addGroupMember(params) {
    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded", //'application/json',
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };

    let param = new HttpParams({
      fromObject: {
        groupId: params.groupId,
        memberId: params.memberId
      }
    });

    return this.http.post(this.Base_URL + "/addGroupMember", param, options);
  }
  removeMember(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/removeGroupMember", param, options);
  }
  updateCustomer(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/updateCustomer", param, options);
  }
  deleteEmployee(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/deleteEmployee", param, options);
  }
  getAllEmployee() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getAllEmployees", null, options);
  }
  editJob(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/editJob", param, options);
  }
  getAllEmployeeForJob() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getEmployeesForJob", null, options);
  }
  getCompanyCards() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getCompanyCards", null, options);
  }
  addCompanyCard(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/addCompanyCard", param, options);
  }
  placeOrder(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/placeOrder", param, options);
  }
  getTags() {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/getOrders", null, options);
  }
  removeCard(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/removeCompanyCard", param, options);
  }

  forgotPassword(param) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/forgotPassword", param, options);
  }

  buySubscription(param) {
    //this.apitoken = JSON.parse(this.userInfo.getUserData());

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken //JSON.parse(this.userInfo.getUserData())
    });
    let options = {
      headers: headers
    };
    return this.http.post(this.Base_URL + "/buySubscriptions", param, options);
  }

  getManagerPermission(){
    let headers = new HttpHeaders({
        'Content-Type':'application/json',
        "Authorization":this.apitoken
    })
    let options = {
        headers:headers
    };
    return this.http.post(this.Base_URL+"/getManagerPermissions",null,options)
  }

  upDateUserPermissions(param){
    let headers = new HttpHeaders({
        'Content-Type':'application/json',
        "Authorization":this.apitoken
    })
    let options = {
        headers:headers
    };
    return this.http.post(this.Base_URL+"/updateUserPermissions",param,options)
  }

  getTechnicianPermission(){
    let hearders = new HttpHeaders({
        'Content-Type':'application/json',
        "Authorization":this.apitoken
    })
    let options = {
        headers:hearders
    };
    return this.http.post(this.Base_URL+"/getTechPermissions",null,options)
  }

  activeEmployee(param){
    let headers = new HttpHeaders({
        'Content-Type':'application/json',
        "Authorization":this.apitoken
    })
    let options = { 
        headers:headers
    };
    return this.http.post(this.Base_URL+"/activateEmployee",param,options)
  }

  getVendors() {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/getCompanyContracts", null, options);
  }

  getContracts() {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/getContracts", null, options);
  }

  searchVendor(param){
    
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/searchContractor", param, options);
  }

  inviteVendor(param){
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/inviteContractor", param, options);
  }

  startContract(param){
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/startContract", param, options);
  }

  acceptRejectContract(param){
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/acceptOrRejectContract", param, options);
  }

  customWorkOrderNumber(param){
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/setCustomWorkOrderNumber", param, options);
  }

  getReport(body:any){
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + `/getJobReport`, body, options);
  }

  getReportNumber(){
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/getCurrentJobId", null, options);
  }

  updateSingleSharedCustomer(item){
    this.singleSharedCustomer.next(item);
  }

  decodingAddress(address){
    return this.http.get(`${this.decoding_URL}?address=${address}&key=${this.decoding_key}`);
  }

  updateShowServiceTicket(event){
    this.showServiceTicket.next(event);
  }

  updateAppLoading(event){
    this.appLoading.next(event);
  }

  updateIndividualProfile(event){
    this.individualProfile.next(event);
  }

  getSyncInfo() {
    const headers = new HttpHeaders({
      Authorization: this.apitoken
    });
    const options = { headers };
    return this.http.post(this.Base_URL + "/getSyncInfo", null, options);
  }

  getQBUri(sessionID) {
    const headers = new HttpHeaders({
      Authorization: this.apitoken
    });
    const options = { headers };
    return this.http.post(this.Base_URL + "/getQBUri", { sessionID }, options);
  }

  getQBCustomers() {
    const headers = new HttpHeaders({
      Authorization: this.apitoken
    });
    const options = { headers };
    return this.http.post(this.Base_URL + "/getQBCustomers", null, options);
  }

  syncQBCustomers() {
    const headers = new HttpHeaders({
      Authorization: this.apitoken
    });
    const options = { headers };
    return this.http.post(this.Base_URL + "/syncQBCustomers", null, options);
  }

  getJobCharges() {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/getJobCharges", null, options);
  }

  createJobCharges(params) {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/createJobCharges", params, options);
  }

  updateJobCharges(params) {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/updateJobCharges", params, options);
  }
  
  createSaleTax(params) {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/createSalesTax", params, options);
  }

  updateSaleTax(params) {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/updateSalesTax", params, options);
  }

  getSaleTax() {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/getSalesTax", null, options);
  }

  getInvoices() {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/getInvoices", null, options);
  }

  generateInvoice(params) {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/createInvoice", params, options); 
  }

  updateInvoice(params) {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/updateInvoice", params, options); 
  }

  getInvoiceDetail(id) {
    let hearders = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this.apitoken
    });
    let options = {
      headers: hearders
    };
    return this.http.post(this.Base_URL + "/getInvoices", id, options);
  }

  updateUserProfileStatus(event){
    this.profileUpdated.next(event);
  }

  updateInvoiceDetail(event){
    this.invoiceDetail.next(event);
  }

}
