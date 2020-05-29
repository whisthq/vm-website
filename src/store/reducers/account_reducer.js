import * as Action from "store/actions/index";
import * as LoginAction from "store/actions/auth/login_actions"
import * as TokenAction from "store/actions/auth/token_actions"
import * as SignupAction from "store/actions/auth/signup_actions"

const DEFAULT = {
    stage: 1,
    amount: 25,
    stripeToken: "",
    type: "",
    id: "",
    vm_created: false,
    is_creating: false,
    progress: 1,
    has_vm: false,
    payment: {},
    stripeStatus: 200,
    failed_payment_attempts: 0,
    currentPage: "personal",
    emailStatus: 0,
    promoCode: "",
    credits: 0,
    failed_referral_attempts: 0,
    verificationEmailsSent: 0,
    customer_status: 0,
    show_survey: false,
    customer: {},
    purchase_location: "",
    dashboard_loaded: false,
    status_id: null,
    change_plan_status: 0,
    add_storage_status: 0
};

export default function (state = DEFAULT, action) {
    switch (action.type) {
        case Action.PROMO_CODE_FAILURE:
            return {
                ...state,
                failed_referral_attempts: state.failed_referral_attempts + 1,
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
        case Action.STORE_PAYMENT:
            return {
                ...state,
                payment: action.payload,
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
        case Action.CANCEL_PLAN:
            return {
                ...state,
                show_survey: false,
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
