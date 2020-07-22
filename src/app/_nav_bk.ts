interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
    // badge: {
    //   variant: "info",
    //   text: "NEW"
    // }
  },
  {
    title: true,
    name: "People"
  },
  {
    name: "Technicians",
    url: "/tech",
    icon: "icon-user"
  },
  {
    name: "Managers",
    url: "/manager",
    icon: "icon-user-follow"
  },
  {
    name: "Groups",
    url: "/group",
    icon: "icon-organization"
  },
  {
    name: "Scheduler",
    url: "/theme/typography",
    icon: "icon-wrench"
  },

  //new api

  {
    name: "Office Admin",
    url: "/officeadmin",
    icon: "icon-user-follow"
  },

  //new api
  {
    name: "New User",
    url: "/newuser",
    icon: "icon-user"
  },
  //new api
  {
    name: "Schedule",
    url: "/visitlist",
    icon: "fa fa-calendar"
  },

  {
    name: "Add",
    url: "/theme/typography",
    icon: "icon-note"
  },
  {
    title: true,
    name: "Equipment"
  },
  {
    name: "Customer Equipment List",
    url: "/customerlist",
    icon: "icon-wrench"
  },
  {
    name: "Equipment Type",
    url: "/type",
    icon: "icon-wrench"
  },
  {
    name: "Brand",
    url: "/brand",
    icon: "icon-pencil"
  },
  {
    name: "Customer List",
    url: "/customerlist",
    icon: "icon-user"
  },
  // {
  //   name: "Customer List",
  //   url: "/user",
  //   icon: "icon-user"
  // },
  {
    name: "Create Work Order",
    url: "/google-maps",
    icon: "icon-envelope"
  },
  {
    title: true,
    name: "Tags"
  },
  {
    name: "Purchased Tags",
    url: "/user",
    icon: "icon-list"
  },

  {
    name: "Buy Tags",
    url: "/google-maps",
    icon: "icon-envelope"
  },
  {
    title: true,
    name: "Profile"
  },
  {
    name: "Profile",
    url: "/profile",
    icon: "icon-envelope"
  },

  //new api
  {
    name: "Company Profile",
    url: "/company-profile",
    icon: "icon-list"
  },
  {
    title: true,
    name: "Billing"
  },
  {
    name: "Subscription Manager",
    url: "/user",
    icon: "icon-list"
  },
  {
    name: "Inventory",
    url: "/inventory",
    icon: "icon-list"
  },
  {
    name: "Update Payment Methods",
    url: "/google-maps",
    icon: "icon-envelope"
  }
];
export const navItemsOfficeAdmin: NavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
  },

  {
    title: true,
    name: "People"
  },
  {
    name: "Technicians",
    url: "/tech",
    icon: "icon-user"
  },
  {
    name: "Groups",
    url: "/group",
    icon: "fa fa-users"
  },
  {
    title: true,
    name: "Customers"
  },
  {
    name: "Schedule",
    url: "/visitlist",
    icon: "fa fa-calendar"
  },
  {
    name: "Invoices",
    url: "/pastinvoice",
    icon: "fa fa-calendar"
  }
];
export const navItemsManufacture: NavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
    // badge: {
    //   variant: "info",
    //   text: "NEW"
    // }
  },
  {
    title: true,
    name: "Welcome"
  },
  {
    name: "Welcome",
    url: "/manufacture/welcome",
    icon: "icon-user-follow"
  },
  {
    name: "Equipment",
    url: "/manufacture/main",
    icon: "icon-printer"
  },
  {
    name: "Profile",
    url: "/manufacture/profile",
    icon: "icon-organization"
  }
];

export const navItemsGym: NavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
    // badge: {
    //   variant: "info",
    //   text: "NEW"
    // }
  },
  {
    title: true,
    name: "Welcome"
  },
  {
    name: "Welcome",
    url: "/gym/welcome",
    icon: "icon-user-follow"
  },
  {
    name: "Gym",
    url: "/gym/main",
    icon: "icon-printer"
  },
  {
    name: "Profile",
    url: "/gym/profile",
    icon: "icon-organization"
  },
  {
    name: "Fitness Manager",
    url: "/gym/fitness_manager",
    icon: "icon-organization"
  },
  {
    name: "Personal Trainer",
    url: "/gym/gym_personal_trainer",
    icon: ""
  }
];
const Gym = {
  text: "Dashboard",
  link: "/gym/dashboard",
  icon: "icon-home",
  submenu: [
    {
      text: "Welcome",
      translate: "sidebar.content.WELCOME",
      link: "/gym/welcome"
    },
    {
      text: "Gym",
      translate: "sidebar.content.GYM",
      link: "/gym/main"
    },
    {
      text: "Profile",
      translate: "sidebar.content.PROFILE",
      link: "/gym/profile"
    },
    {
      text: "Fitness Manager",
      translate: "sidebar.content.FitnessManager",
      link: "/gym/fitness_manager"
    },
    {
      text: "Personal Trainer",
      translate: "sidebar.content.GYMPERSONALTRAINER",
      link: "/gym/gym_personal_trainer"
    }
  ]
};

export const navItemsTechManager: NavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
    // badge: {
    //  text: "NEW"
    // } variant: "info",
    //
  },
  {
    title: true,
    name: "Technician List"
  },
  {
    name: "Technician List",
    url: "/tech_manager",
    icon: "icon-user-follow"
  },
  {
    name: "Equipment",
    url: "/tech_manager/equipment",
    icon: "icon-printer"
  },
  {
    name: "Company",
    url: "/tech_manager/customer",
    icon: "icon-organization"
  },
  {
    name: "Schedule",
    url: "/tech_manager/schedule",
    icon: "icon-user"
  },
  {
    name: "Subscription Manager",
    url: "/tech_manager/subscription",
    icon: "icon-user-follow"
  },
  {
    name: "Buy Blue Tag",
    url: "/tech_manager/buytag",
    icon: "icon-list"
  },
  {
    name: "Schedule",
    url: "/tech_manager/schedule",
    icon: "icon-user"
  },
  {
    name: "Equipment Type",
    url: "/tech_manager/type",
    icon: "icon-user"
  },
  {
    name: "Brand/Manufacturer",
    url: "/tech_manager/brand",
    icon: "icon-note"
  },
  {
    name: "Subscribe",
    url: "/tech_manager/unsubscribe",
    icon: "icon-organization"
  },
  {
    name: "Inventory",
    url: "/inventory",
    icon: "icon-list"
  },
  {
    name: "Profile",
    url: "/tech_manager/profile",
    icon: "icon-organization"
  }
];

export const navTech: NavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
    // badge: {
    //   variant: "info",
    //   text: "NEW"
    // }
  },
  // {
  //   title: true,
  //   name: "Admin"
  // },
  // {
  //   name: "Roles",
  //   url: "/roles",
  //   icon: "icon-user"
  // },

  // {
  //   name: "Roles",
  //   url: "/roles",
  //   icon: "icon-user"
  // },
  {
    // <<<<<<< HEAD
    // =======
    title: true,
    name: "People"
  },
  {
    // >>>>>>> f545aec7c828cca1c5bbf390e9f5db75b928f1b6
    name: "Groups",
    url: "/group",
    icon: "fa fa-users"
  },
  // {
  //   name: "Manager Groups",
  //   url: "/manager-group",
  //   icon: "icon-user"
  // },
  // {
  //   name: "Manager Groups",
  //   url: "/group-manager",
  //   icon: "icon-user"
  // },
  {
    name: "Technicians",
    url: "/tech",
    icon: "icon-user"
  },
  {
    name: "Managers",
    url: "/manager",
    icon: "icon-user-follow"
  },
  {
    name: "Office Admin",
    url: "/officeadmin",
    icon: "icon-user-follow"
  },

  // {
  //   name: "Add",
  //   url: "/manager",
  //   icon: "icon-note"
  // },
  {
    title: true,
    name: "Equipment"
  },
  // {
  //   name: "Customer Equipment List",
  //   url: "/equipment",
  //   icon: "icon-wrench"
  // },
  {
    name: "Equipment Type",
    url: "/type",
    icon: "icon-wrench"
  },
  {
    name: "Brand",
    url: "/brand",
    icon: "icon-pencil"
  },
  // {
  //   name: "Assign Brand",
  //   url: "/assignbrand",
  //   icon: "icon-pencil"

  // },
  {
    title: true,
    name: "Customers"
  },
  // {
  //   name: "Customer Equipment List",
  //   url: "/equipment",
  //   icon: "icon-wrench"
  // },
  // {
  //   name: "Email Shedule",
  //   url: "/email-schedule",
  //   icon: "icon-user"
  // },
  {
    name: "Customer List",
    url: "/customer",
    icon: "icon-list"
  },
  {
    name: "Schedule/Jobs",
    url: "/visitlist",
    icon: "fa fa-calendar"
  },
  // {
  //   name: "Group",
  //   url: "/group",
  //   icon: "icon-user"
  // },
  {
    title: true,
    name: "Tags"
  },
  {
    name: "Purchased Tags",
    url: "/purchasedtag",
    icon: "fa fa-tags"
  },
  {
    name: "Buy Blue Tag",
    url: "/buytag",
    icon: "icon-tag"
  },

  // {
  //   title: true,
  //   name: "Profile"
  // },
  // {
  //   name: "Profile",
  //   url: "/profile",
  //   icon: "icon-envelope"
  // },
  // {
  // {
  //   name: "Groups",
  //   url: "/group",
  //   icon: "icon-user"
  // },
  // {
  //   title: true,
  //   name: "Billing"
  // },

  // {
  //   title: true,
  //   name: "Profile"
  // },
  //  f545aec7c828cca1c5bbf390e9f5db75b928f1b6
  {
    title: true,
    name: "Inventory"
  },
  {
    name: "Company Inventory",
    url: "/inventory",
    icon: "fa fa-wrench"
  },
  {
    title: true,
    name: "Admin"
  },
  {
    name: "Admin",
    url: "/admin",
    icon: "icon-user"
  },
  {
    name: "New User",
    url: "/newuser",
    icon: "icon-user"
  }
];

// export const navMainItems: NavData[] = [
//   {
//     name: "Dashboard",
//     url: "/dashboard",
//     icon: "icon-speedometer",
//     badge: {
//       variant: "info",
//       text: "NEW"
//     }
//   },
//   {
//     title: true,
//     name: "Equipment"
//   },
//   {
//     name: "Brand",
//     url: "/brand",
//     icon: "icon-pencil"
//   },

// ];

// role:3
export const MenuSubscriber: NavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
  },
  {
    title: true,
    name: "People"
  },
  {
    name: "Groups",
    url: "/group",
    icon: "fa fa-users"
  },
  {
    name: "Technicians",
    url: "/tech",
    icon: "icon-user"
  },
  {
    name: "Managers",
    url: "/manager",
    icon: "icon-user-follow"
  },
  {
    name: "Office Admin",
    url: "/officeadmin",
    icon: "icon-user-follow"
  },
  {
    title: true,
    name: "Equipment"
  },
  {
    name: "Equipment Type",
    url: "/type",
    icon: "icon-wrench"
  },
  // {
  //   name: "Company Equipment List",
  //   url: "/companyEquipmentList",
  //   icon: "icon-wrench"
  // },
  {
    name: "Brand",
    url: "/brand",
    icon: "icon-pencil"
  },
  {
    title: true,
    name: "Customers"
  },
  {
    name: "Customer List",
    url: "/customer",
    icon: "icon-list"
  },
  {
    name: "Schedule/Jobs",
    url: "/schedule",
    icon: "fa fa-calendar"
  },

  {
    title: true,
    name: "Tags"
  },
  {
    name: "Purchased Tags",
    url: "/purchasedtag",
    icon: "fa fa-tags"
  },
  {
    name: "Buy Blue Tag",
    url: "/buytag",
    icon: "icon-tag"
  },
  {
    title: true,
    name: "Inventory"
  },
  {
    name: "Company Inventory",
    url: "/inventory",
    icon: "fa fa-wrench"
  },
  {
    title: true,
    name: "Admin"
  },
  {
    name: "Admin",
    url: "/admin",
    icon: "icon-user"
  },
  {
    name: "New User",
    url: "/newuser",
    icon: "icon-user"
  },
  {
    name: "New Employee",
    url: "/newemployee",
    icon: "icon-user"
  }
];

//role:0,1,2
export const Menutechnician: NavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
  },
  {
    name: "Schedule/Jobs",
    url: "/schedule",
    icon: "fa fa-calendar"
  },
  {
    title: true,
    name: "Equipment"
  },
  // {
  //   name: "Customer Equipment List",
  //   url: "/customerlist",
  //   icon: "icon-wrench"
  // },
  {
    name: "Equipment Type",
    url: "/type",
    icon: "icon-wrench"
  },
  {
    name: "Brand",
    url: "/brand",
    icon: "icon-pencil"
  },
  {
    name: "Customer List",
    url: "/customer",
    icon: "icon-user"
  },
  {
    title: true,
    name: "Tags"
  },
  {
    name: "Purchased Tags",
    url: "/purchasedtag",
    icon: "fa fa-tags"
  },
  {
    name: "Buy Blue Tag",
    url: "/buytag",
    icon: "icon-tag"
  },
  {
    title: true,
    name: "Inventory"
  },
  {
    name: "Company Inventory",
    url: "/inventory",
    icon: "fa fa-wrench"
  },
  {
    title: true,
    name: "Admin"
  },
  {
    name: "Admin",
    url: "/admin",
    icon: "icon-user"
  },
  {
    name: "New User",
    url: "/newuser",
    icon: "icon-user"
  }
];

//role:4

export const MenuGlobalAdmin: NavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
  },
  {
    name: "Schedule/Jobs",
    url: "/schedule",
    icon: "fa fa-calendar"
  },
  {
    title: true,
    name: "Equipment"
  },
  {
    name: "Equipment Type",
    url: "/type",
    icon: "icon-wrench"
  },
  {
    name: "Brand",
    url: "/brand",
    icon: "icon-pencil"
  },
  {
    title: true,
    name: "Tags"
  },
  {
    name: "Purchased Tags",
    url: "/purchasedtag",
    icon: "fa fa-tags"
  },
  {
    name: "Buy Blue Tag",
    url: "/buytag",
    icon: "icon-tag"
  },
  {
    title: true,
    name: "Profile"
  },
  {
    title: true,
    name: "Inventory"
  },
  {
    name: "Company Inventory",
    url: "/inventory",
    icon: "fa fa-wrench"
  },
  {
    title: true,
    name: "Admin"
  },
  {
    name: "Admin",
    url: "/admin",
    icon: "icon-user"
  },
  {
    name: "New User",
    url: "/newuser",
    icon: "icon-user"
  },
  {
    name: "New Employee",
    url: "/newemployee",
    icon: "icon-user"
  }
];
