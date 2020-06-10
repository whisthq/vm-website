export const AUTH_DEFAULT = {
    username: "",
    password: "",
    logged_in: false,
    failed_login_attempts: 0,
    forgot_password: 0,
    forgot_email: "",
    token_status: "invalid",
    signup_status: 200,
    failed_signup_attempts: 0,
    email_verified: false,
    verification_token: "",
    account_locked: false,
    access_token: "",
    refresh_token: "",
    verification_emails_sent: 0,
    needs_reason: false,
};

export const DASHBOARD_DEFAULT = {
    amount: 25,
    stripe_token: "",
    vm_created: false,
    disk_is_creating: false,
    disks: [],
    has_vm: false,
    payment: {},
    stripe_status: 200,
    failed_payment_attempts: 0,
    friend_email_status: 0,
    promo_code: "",
    credits: 0,
    failed_referral_attempts: 0,
    verification_emails_sent: 0,
    customer_status: 0,
    show_survey: false,
    customer: {},
    purchase_location: "",
    dashboard_loaded: false,
    disk_attach_status_id: null,
    disk_creation_message: "",
    current_disk: null,
    change_plan_status: 0,
    vm_setup_data: {
        country: null,
        spec: null,
        location: null,
        plan: null,
        apps: [],
        step: 4,
    },
};

export const SETTINGS_DEFAULT = {
    add_storage_status: 0,
};

export const GENERAL_DEFAULT = {
    current_page: "personal",
};
