import * as Action from "store/actions/auth/login_actions";

const DEFAULT = {
    username: "",
    password: "",
    logged_in: false
};

export default function (state = DEFAULT, action) {
    switch (action.type) {
        case Action.USER_LOGIN:
            return {
                ...state,
                username: action.username,
                password: action.password,
            };
        case Action.USER_SIGNUP:
            return {
                ...state,
                user: action.user,
                password: action.password,
            };
        case Action.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
            };
        case Action.LOGIN_FAILURE:
            return {
                ...state,
                failed_login_attempts: state.failed_login_attempts + 1,
            };
        case Action.PROMO_CODE_FAILURE:
            return {
                ...state,
                failed_referral_attempts: state.failed_referral_attempts + 1,
            };
        case Action.SIGNUP_SUCCESS:
            return {
                ...state,
                loggedIn: true,
            };
        case Action.CHANGE_STAGE:
            return {
                ...state,
                vm_created: false,
                stage: action.stage,
            };
        case Action.CHARGE_STRIPE:
            return {
                ...state,
                vm_created: false,
                amount: action.amount,
                stripeToken: action.token,
            };
        case Action.LOGOUT:
            return DEFAULT;
        case Action.STORE_DISKS:
            return {
                ...state,
                disks: action.disks,
            };
        case Action.VM_CREATING:
            return {
                ...state,
                is_creating: action.is_creating,
            };
        case Action.PROGRESS_BAR:
            return {
                ...state,
                progress: action.progress,
            };
        case Action.FORGOT_PASSWORD_EMAIL_INCORRECT:
            return {
                ...state,
                forgot_password: state.forgot_password + 1,
            };
        case Action.FORGOT_PASSWORD_EMAIL_CORRECT:
            return {
                ...state,
                forgot_password: state.forgot_password - 1,
                forgot_email: action.username,
            };
        case Action.TOKEN_STATUS:
            return {
                ...state,
                token_status: action.tokenStatus,
            };
        case Action.STORE_PAYMENT:
            return {
                ...state,
                payment: action.payload,
            };
        case Action.SIGNUP_FAILURE:
            return {
                ...state,
                signupStatus: action.status,
                failed_signup_attempts: action.status !== 400 ? state.failed_signup_attempts : state.failed_signup_attempts + 1
            };
        case Action.STRIPE_FAILURE:
            return {
                ...state,
                stripeStatus: action.status,
                failed_payment_attempts: state.failed_payment_attempts + 1,
            };
        case Action.CHANGE_TAB:
            return {
                ...state,
                currentPage: action.tab,
            };
        case Action.EMAIL_SENT:
            return {
                ...state,
                emailStatus: action.status,
            };
        case Action.STORE_PROMO_CODE:
            return {
                ...state,
                promoCode: action.code,
            };
        case Action.STORE_CREDITS:
            return {
                ...state,
                credits: action.credits,
            };
        case Action.EMAIL_VERIFIED:
            return {
                ...state,
                email_verified: action.verified,
            };
        case Action.STORE_VERIFICATION_TOKEN:
            return {
                ...state,
                verificationToken: action.token,
            };
        case Action.INCREMENT_VERIFICATION_EMAILS_SENT:
            return {
                ...state,
                verificationEmailsSent: state.verificationEmailsSent + 1,
            };
        case Action.CUSTOMER_CREATED:
            return {
                ...state,
                customer_status: action.status,
            };
        case Action.TRIGGER_SURVEY:
            return {
                ...state,
                show_survey: action.trigger,
            };
        case Action.STORE_CUSTOMER:
            return {
                ...state,
                customer: action.customer,
            };
        case Action.STORE_ACCOUNT_LOCKED:
            return {
                ...state,
                account_locked: action.locked,
            };
        case Action.CANCEL_PLAN:
            return {
                ...state,
                show_survey: false,
            };
        case Action.STORE_JWT:
            return {
                ...state,
                access_token: action.access_token,
                refresh_token: action.refresh_token,
            };
        case Action.STORE_PURCHASE_LOCATION:
            return {
                ...state,
                purchase_location: action.location,
            };
        case Action.DASHBOARD_LOADED:
            return {
                ...state,
                dashboard_loaded: action.loaded,
            };
        case Action.STORE_ID:
            return {
                ...state,
                status_id: action.status_id,
            };
        case Action.CHANGE_STATUS_MESSAGE:
            return {
                ...state,
                disk_creation_message: action.disk_creation_message,
            };
        case Action.STORE_CURRENT_DISK:
            return {
                ...state,
                current_disk: action.current_disk,
            };
        case Action.CHANGE_PLAN_STATUS:
            return {
                ...state,
                change_plan_status: action.status
            }
        case Action.ADD_STORAGE_STATUS:
            return {
                ...state,
                add_storage_status: action.status
            }
        default:
            return state;
    }
}
