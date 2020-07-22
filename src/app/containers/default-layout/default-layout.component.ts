import { DOCUMENT, Location } from "@angular/common";
import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Http } from "@angular/http";
import { Router, ActivatedRoute } from "@angular/router";
import { ToasterService } from "angular2-toaster";
import Swal from "sweetalert2";
import { ApiProvider } from "../../service/api";
import { StorageService } from "../../shared/storage/storage.service";
import { UserService } from "../../shared/users/user.service";
import { MenuGlobalAdmin, MenuSubscriber, Dashboard, Admin, People, Customers, Tags, Inventory, Invoicing, Integration } from '../../_nav';
@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
  styleUrls: ["./default-layout.component.scss"]
})
export class DefaultLayoutComponent implements OnDestroy, OnInit {
  @ViewChild('productImg', { static: false }) productImg: ElementRef;
  // private menu= new Subject<any>();
  // menuStatus = this.menu.asObservable();
  public navItems: any;
  public navItem: any;
  public subtitle: any;
  public hidenav: boolean;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public err = '';
  userdata: any;
  role: any;
  imageUrl: any;
  appLoading: boolean = false;
  constructor(
    private location: Location,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: StorageService,
    public apiProvider: ApiProvider,
    public http: Http,
    private mdToast: ToasterService,
    private user: UserService,
    @Inject(DOCUMENT) _document?: any
  ) {
    this.userdata = JSON.parse(user.getUserData('userInfo'));
    if (this.userdata) {
      this.imageUrl =
        this.userdata['profile']['imageUrl'] === ''
          ? 'assets/img/user_avatar.png'
          : this.userdata['profile']['imageUrl'];
      console.log('image', this.userdata);
      this.role = this.userdata['permissions']['role'];
    } else {
      this.router.navigate(['/login']);
    }


    if (this.user.profilePicture !== undefined) {
      this.user.profilePicture.subscribe(result => {
        console.log('I am called');
        this.userdata = JSON.parse(user.getUserData('userInfo'));
        this.imageUrl = this.userdata['profile']['imageUrl'];
      });
    }
    if (this.role === 3) {
      this.navItem = MenuSubscriber;
      this.navItems = Dashboard;
      console.log(this.navItems);
    } else if (this.role === 0 || this.role === 1 || this.role === 2) {
      this.navItems = MenuSubscriber; //Menutechnician;
    } else if (this.role === 4) {
      this.navItems = MenuGlobalAdmin;
    }
    this.changes = new MutationObserver(mutations => {
      this.sidebarMinimized = _document.body.classList.contains(
        'sidebar-minimized'
      );
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });


  }

  ngOnInit() {
    this.apiProvider.appLoading.subscribe((loading: boolean) => {
      if (loading != null) {
        this.appLoading = loading;
      }
    });
    this.apiProvider.profileUpdated.subscribe((updatedUser: any) => {
      if (updatedUser) {
        this.userdata = JSON.parse(this.user.getUserData('userInfo'));
        this.imageUrl =
          this.userdata['profile']['imageUrl'] === ''
            ? 'assets/img/user_avatar.png'
            : this.userdata['profile']['imageUrl'];
      }
    });
    this.navItems = Admin;
    this.subtitle = 'Admin';
    this.hidenav = false;
  }

  navSearch(nav: string) {
    let navname = nav.toLowerCase();
    switch (navname) {
      case 'dashboard' :
        // this.router.navigateByUrl(navname);
        this.navItems = Dashboard;
        this.subtitle = nav;
        this.hidenav = true;
        break;
      case 'people' :
        this.navItems = People;
        this.subtitle = nav;
        this.hidenav = false;
        break;
      case 'customers' :
        this.navItems = Customers;
        this.subtitle = nav;
        this.hidenav = false;
        break;
      case 'tags' :
        this.navItems = Tags;
        this.subtitle = nav;
        this.hidenav = false;
        break;
      case 'inventory' :
        this.navItems = Inventory;
        this.subtitle = nav;
        this.hidenav = false;
        break;
      case 'admin' :
        this.navItems = Admin;
        this.subtitle = nav;
        this.hidenav = false;
        break;
      case 'integrations' :
        this.navItems = Integration;
        this.subtitle = nav;
        this.hidenav = false;
        break;
      case 'invoicing' :
        this.navItems = Invoicing;
        this.subtitle = nav;
        this.hidenav = false;
        break;
    }
  }

  logOut() {
    Swal.fire({
      title: '<strong>Log Out</strong>',
      type: 'info',
      html: '<h5>Are you sure you want to log out?</h5>',
      showCloseButton: false,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonAriaLabel: 'Yes',
      cancelButtonAriaLabel: 'No'
    }).then(result => {
      if (result.value) {
        //this.user.clearUserInfo();
        localStorage.removeItem('userInfo');
        //this.location.replaceState('/');
        this.user.updateLoggedUser(null);
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  goToProfile() {
    console.log(this.userdata);
    let userType;
    if (this.userdata.__t === 'CompanyAdmin') {
      userType = 'Company Admin';
    }
    // tslint:disable-next-line: no-use-before-declare
    const profile = new individualProfile(this.userdata.__t, this.userdata, '/admin', userType);
    this.apiProvider.updateIndividualProfile(profile);
    this.router.navigate([`/individual-profile`]);
    // this.router.navigate(["/profile"]);
  }
  goBack() {
    this.location.back();
  }
}

// tslint:disable-next-line:class-name
export class individualProfile {
  constructor(type, detail, route, title) {
    this.type = type;
    this.details = detail;
    this.backRoute = route;
    this.title = title;
  }
  type: string;
  details: any;
  backRoute: string;
  title: string;
}

