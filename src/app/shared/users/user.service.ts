import { Injectable, EventEmitter } from '@angular/core';
import { Subject  } from 'rxjs/Subject';
import { Observable  } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
    loggedUser = new BehaviorSubject(null);
    navchange: EventEmitter<any> = new EventEmitter();
    private email = '';
    private id = '';
    private userType = '';
    private token = '';
    private stripeAccountId = '';
    info = {};
    user = {};
    constructor() {
        this.loadUserInfo();
    }

    setUserInfo(userInfo, isGlobal) {
        this.clearUserInfo();
        this.info = userInfo;

        /*if(isGlobal) {
            this.saveDataToGlobal();
        } else {
            this.saveDataToLocal();
        }*/
        this.saveDataToGlobal();
        this.saveDataToLocal();
    }

    setCardInfo(street, city, state, zipCode, nameOnCard, customerId) {
        this.loadUserInfo();
        this.info['card_street'] = street;
        this.info['card_city'] = city;
        this.info['card_state'] = state;
        this.info['card_zip_code'] = zipCode;
        this.info['card_name'] = nameOnCard;
        this.info['account_id'] = customerId;
        this.saveDataToGlobal();
        this.saveDataToLocal();
    }

    loadUserInfo() {
        this.loadDataFromLocal();
        if (this.info) {
            let token = this.info['token'];
            if (token == '' || token == undefined) {
                this.loadDataFromGlobal();
            }
        }
        else {
            this.loadDataFromGlobal();
        }
    }

    updateUserInfo(key, info) {
        let isGlobal = false;
        let userInfo = this.getDataFromLocal('info');
        if (!userInfo) {
            isGlobal = true;
            userInfo = this.getDataFromGlobal('info');
        }

        if (userInfo) {
            userInfo[key] = info;
        }
        this.setUserInfo(userInfo, isGlobal);
    }

    getUserInfo(key) {
        this.loadUserInfo();
        if (this.info) {
            return this.info[key];
        } else {
            return undefined;
        }
    }

    clearUserInfo() {
        this.info = {};
        this.saveDataToLocal();
        this.saveDataToGlobal();
    }

    setStripeAccountId(stripeAccountId) {
        this.stripeAccountId = stripeAccountId;
        this.saveDataToGlobal();
        this.saveDataToLocal();
    }

    saveDataToGlobal() {
        var localData: any = localStorage.getItem('lm_admin');
        if (localData) {
            localData = JSON.parse(localData);
        } else {
            localData = {};
        }
        localData = {
            info: this.info,
        };
        localStorage.setItem('lm_admin', JSON.stringify(localData));
    }

    saveDataToLocal() {
        var localData: any = sessionStorage.getItem('lm_admin');
        if (localData) {
            localData = JSON.parse(localData);
        } else {
            localData = {};
        }
        localData = {
            info: this.info
        };
        sessionStorage.setItem('lm_admin', JSON.stringify(localData));
    }

    loadDataFromGlobal() {
        this.info = this.getDataFromGlobal('info');
    }

    loadDataFromLocal() {
        this.info = this.getDataFromLocal('info');
    }

    getDataFromGlobal(key) {
        let data = JSON.parse(localStorage.getItem('lm_admin'));
        if (!data) {
            return undefined;
        }
        if (key) {
            if (data[key]) {
                return data[key];
            } else {
                return undefined;
            }
        }
        return data;
    }

    getDataFromLocal(key) {
        let data = JSON.parse(sessionStorage.getItem('lm_admin'));
        if (!data) {
            return undefined;
        }
        if (key) {
            if (data[key]) {
                return data[key];
            } else {
                return undefined;
            }
        }
        return data;
    }
    setUserdata(key,Data) {

        console.log(Data);
        localStorage.setItem(key, JSON.stringify(Data));

        // this.saveDataToGlobal();
        // this.saveDataToLocal();
    }
    getUserData(key) {
        return localStorage.getItem(key);
    
    }
    private profilePictureSource = new Subject<any>();
    profilePicture = this.profilePictureSource.asObservable();
    updateProfilePicture() {
        console.log("USERTS")
        this.profilePictureSource.next();
    }
    private menu= new Subject<any>();
    menuStatus = this.menu.asObservable();
    Updatemenu(){
     this.menu.next();
 
    }
 
    private customer_name = new BehaviorSubject('default name');
    customer = this.customer_name.asObservable();
     changeName(name:any) {
         this.customer_name.next(name)
     }
 
   private userName = new BehaviorSubject('default name');
     userData= this.userName.asObservable();
   UserName(name:any) {
    this.userName.next(name)
  }

  updateLoggedUser(event){
      this.loggedUser.next(event);
  }

}