export const EnvVariables = {
    //SERVER_ADDR: "http://localhost:8771/blueclerk_backend_php/webapi",
    SERVER_ADDR: "https://app.blueclerk.com/fieldservice/webapi",
    CHECK_LOGIN: "/login/check_user.php",
    ADMIN_LOGIN: "/login/authenticate_admin.php",
    GET_GYM: "/login/get_gym.php",

    UPDATE_TERM: "/login/update_term.php",
    ATRAINER_LIST: "/client/get_client.php",
    ATRAINER_HISTORY: "/client/get_client_history.php",
    GYM_LIST: "/gym/get_gym.php",
    ADD_GYM: "/gym/add_gym.php",
    UPDATE_GYM: "/gym/update_gym.php",
    DELETE_GYM: "/gym/delete_gym.php",
    REPORT_GYM: "/gym/get_gym_report.php",

    GROUP_LIST: "/group/get_group.php",
    ADD_GROUP: "/group/add_group.php",
    UPDATE_GROUP: "/group/update_group.php",
    DELETE_GROUP: "/group/delete_group.php",
    GROUP_EQUIP_LIST: "/group/get_group_equipment.php",
    ADD_GROUP_EQUIPMENT: "/group/add_group_equipment.php",
    UPDATE_GROUP_EQUIPMENT: "/group/update_group_equipment.php",
    DELETE_GROUP_EQUIPMENT: "/group/delete_group_equipment.php",
    GROUP_MANAGER_LIST: "/group/get_group_manager.php",
    ADD_GROUP_MANAGER: "/group/add_group_manager.php",
    DELETE_GROUP_MANAGER: "/group/delete_group_manager.php",
    COMPANY_MANAGER_LIST: "/group/get_company_manager.php",
    COMPANY_TECH_LIST:"/group/get_tech_list.php",

    USER_LIST: "/user/get_user.php",
    REPORT_USER: "/user/get_user_report.php",

    MANAGER_LIST: "/manager/get_manager.php",
    ADD_MANAGER: "/manager/add_manager.php",
    DELETE_MANAGER: "/manager/delete_manager.php",
    UPDATE_MANAGER: "/manager/update_profile.php",

    EQUIPMENT_EXERCISE_LIST: "/exercise/get_equipment_exercise.php",
    ADD_EXERCISE: "/exercise/add_exercise.php",
    UPDATE_EXERCISE: "/exercise/update_exercise.php",
    DELETE_EXERCISE: "/exercise/delete_exercise.php",

    GYM_OWNER_EQUIP_LIST: "/manager/get_gym_equipment.php",
    MANUFACTURE_EQUIP_LIST: "/manager/get_manufacturer_equipment.php",
    GET_EQUIPMENT_DETAIL: "/equipment/get_equipment_detail.php",

    EQUIP_LIST: "/equipment/get_equipment.php",
    ADD_EQUIP: "/equipment/add_equipment.php",
    UPDATE_EQUIP: "/equipment/update_equipment.php",
    DELETE_EQUIP: "/equipment/delete_equipment.php",

    GYM_EQUIP_LIST: "/gym/get_gym_equipment.php",
    NONE_EQUIP_LIST: "/equipment/get_none_nfc_equipment.php",
    ADD_NFC: "/equipment/add_nfc_tag.php",
    UPDATE_NFC: "/equipment/update_nfc_tag.php",
    DELETE_NFC: "/equipment/delete_nfc_tag.php",

    BRAND_LIST: "/brand/get_brand.php",
    ADD_BRAND: "/brand/add_brand.php",
    UPDATE_BRAND: "/brand/update_brand.php",
    DELETE_BRAND: "/brand/delete_brand.php",

    ALL_TYPE_LIST: "/type/get_all_type.php",
    TYPE_LIST: "/type/get_type.php",
    ADD_TYPE: "/type/add_type.php",
    UPDATE_TYPE: "/type/update_type.php",
    DELETE_TYPE: "/type/delete_type.php",

    TRAINER_LIST: "/trainer/get_trainer.php",
    ADD_TRAINER: "/trainer/add_trainer.php",
    DELETE_TRAINER: "/trainer/delete_trainer.php",

    SEND_RESET_URL: "/login/send_forgot_link.php",
    CHECK_VALIDATION: "/login/validate_forgot_token.php",
    RESET_PASSWORD: "/login/update_password.php",

    FITNESS_MANAGER: "/fitness_manager/get_fitness_manager.php",
    ADD_FITNESS_MANAGER: "/fitness_manager/add_fitness_manager.php",

    PERSONAL_TRAINER: "/trainer/get_manager_trainer.php",
    ADD_MANAGER_TRAINER: "/trainer/add_manager_trainer.php",
    GYM_TRAINER: "/trainer/get_gym_trainer.php",

    DELETE_FITNTESS_MANAGER: "/fitness_manager/delete_fitness_manager.php",
    DELETE_MANAGER_TRAINER: "/trainer/delete_manager_trainer.php",

    PAYMENT_SERVER_ADDR: "https://www.blueclerk.com:8092/payment",
    //PAYMENT_SERVER_ADDR: "https://35.174.146.100:8092/payment",
    STRIPE_CUSTOMER: "/customer",
    STRIPE_CARD_CHANGE: "/change",
    STRIPE_CHARGE: "/charge",
    STRIPE_TAG_CHARGE: "/tagCharge",
    REGISTER_GYM_OWNER: "/login/register_user.php",

    TECH_LIST: "/tech/get_tech.php",
    ADD_TECH: "/tech/add_tech.php",
    DELETE_TECH: "/tech/delete_tech.php",

    TECH_MANAGER_LIST: "/tech_manager/get_tech_manager.php",
    ADD_TECH_MANAGER: "/tech_manager/add_tech_manager.php",
    DELETE_TECH_MANAGER: "/tech_manager/delete_tech_manager.php",

    TECH_MANAGER_TECH_LIST: "/tech_manager/get_tech.php",
    TECH_MANAGER_ADD_TECH: "/tech_manager/add_tech.php",

    REPORT_TECH: "/tech/report_tech.php",
    ACTION_STUFF_LIST: "/action/get_action_stuff.php",
    ADD_STUFF: "/action/add_stuff.php",
    UPDATE_STUFF: "/action/update_stuff.php",
    DELETE_STUFF: "/action/delete_stuff.php",
    UPDATE_TECH_PROFILE: "/tech_manager/update_profile.php",

    TECH_HISTORY: "/tech/get_history.php",
    GET_TECH_MANAGER_CUSTOMER: "/tech_manager/get_customer.php",
    ADD_TECH_MANAGER_CUSTOMER: "/tech_manager/add_customer.php",
    ADD_TECH_MANAGER_CUSTOMERS: "/tech_manager/add_customers.php",
    UPDATE_TECH_MANAGER_CUSTOMER: "/tech_manager/update_customer.php",
    DELETE_TECH_MANAGER_CUSTOMER: "/tech_manager/delete_customer.php",
    UPDATE_TECH_MANAGER_PROFILE: "/tech_manager/update_profile.php",
    CHANGE_PASSWORD:"/tech_manager/change_password.php",
    CHANGE_PASSWORD_MAIL:"/tech_manager/change_password_mail.php",
    // CHANGE_PASSWORD_MAIL:"change_password_mail.php",
    GET_TECH_MANAGER_SCHEDULE: "/tech_manager/get_schedule.php",
    GET_LOCATION: "/tech_manager/get_location.php",
    GET_LOGINS: "/tech_manager/get_logins.php",

    ADD_CUSTOMER:"/customer/add_customer.php",
    GET_CUSTOMER:"/customer/get_customer.php",
    DELETE_CUSTOMER:"/customer/delete_customer.php",

    ADD_SCHEDULE: "/tech_manager/add_schedule.php",
    UPDATE_SCHEDULE: "/tech_manager/update_schedule.php",
    DELETE_SCHEDULE: "/tech_manager/delete_schedule.php",
    
    DATA_ENTRY_LIST: "/data_entry/get_data_entry.php",
    ADD_DATA_ENTRY: "/data_entry/add_data_entry.php",
    DELETE_DATA_ENTRY: "/data_entry/delete_data_entry.php",

    GET_PURCHAED_TAGS: "/tech_manager/get_purchased_tags.php",

    SUBSCRIBE_EMAIL: "/login/subscribe_email.php",
    SUBSCRIBE_LIST: "/login/subscribe_list.php",

    NEWSLETTER_MANAGER_LIST: "/newsletter_manager/get_newsletter_manager.php",
    ADD_NEWSLETTER_MANAGER: "/newsletter_manager/add_newsletter_manager.php",
    DELETE_NEWSLETTER_MANAGER: "/newsletter_manager/delete_newsletter_manager.php",

        
    ADD_EMAIL_SCHEDULE : "/email_schedule/add_email_schedule.php",
    UPDATE_EMAIL_SCHEDULE : "/email_schedule/update_email_schedule.php",
    EMAIL_SCHEDULE_LIST: "/email_schedule/get_email_schedule.php",
    DELETE_EMAIL_SCHEDULE: "/email_schedule/delete_email_schedule.php",

    UNSUBSCRIBE_EMAIL: "/email_schedule/unsubscribe_email.php",

    ALL_USERS_LIST: "/role/get_all_user.php",
    UPDATE_ROLE: "/role/update_role.php",

};