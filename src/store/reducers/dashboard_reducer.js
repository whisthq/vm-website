import * as DiskAction from "store/actions/dashboard/disk_actions";
import * as StripeAction from "store/actions/dashboard/stripe_actions";
import * as CustomerAction from "store/actions/dashboard/customer_actions";
import * as PopupAction from "store/actions/dashboard/popup_actions";
import * as RenderingAction from "store/actions/dashboard/rendering_actions";
import * as VMSetupAction from "store/actions/dashboard/vm_setup_actions";
import * as LoginAction from "store/actions/auth/login_actions";

import { DASHBOARD_DEFAULT } from "store/reducers/defaults";

export default function (state = DASHBOARD_DEFAULT, action) {
    switch (action.type) {
        case DiskAction.STORE_DISKS:
            return {
                ...state,
                disks: action.disks,
            };
        case DiskAction.DISK_CREATING:
            return {
                ...state,
                disk_is_creating: action.disk_is_creating,
            };
        case StripeAction.STORE_PAYMENT:
            return {
                ...state,
                payment: action.payload,
            };
        case StripeAction.STRIPE_FAILURE:
            return {
                ...state,
                stripe_status: action.status,
                failed_payment_attempts: state.failed_payment_attempts + 1,
            };
        case PopupAction.FRIENDS_EMAIL_SENT:
            return {
                ...state,
                friend_email_status: action.status,
            };
        case CustomerAction.STORE_USER:
            return {
                ...state,
                user: action.user,
            };
        case CustomerAction.PROMO_CODE_FAILURE:
            return {
                ...state,
                failed_referral_attempts: state.failed_referral_attempts + 1,
            };
        case CustomerAction.STORE_CREDITS:
            return {
                ...state,
                credits: action.credits,
            };
        case CustomerAction.CUSTOMER_CREATED:
            return {
                ...state,
                customer_status: action.status,
            };
        case PopupAction.TRIGGER_SURVEY:
            return {
                ...state,
                show_survey: action.trigger,
            };
        case CustomerAction.STORE_CUSTOMER:
            return {
                ...state,
                customer: action.customer,
            };
        case StripeAction.CANCEL_PLAN:
            return {
                ...state,
                show_survey: false,
            };
        case RenderingAction.DASHBOARD_LOADED:
            return {
                ...state,
                dashboard_loaded: action.loaded,
            };
        case DiskAction.STORE_DISK_ATTACH_ID:
            return {
                ...state,
                disk_attach_status_id: action.disk_attach_status_id,
            };
        case DiskAction.CHANGE_DISK_STATUS_MESSAGE:
            return {
                ...state,
                disk_creation_message: action.disk_creation_message,
            };
        case DiskAction.STORE_CURRENT_DISK:
            return {
                ...state,
                current_disk: action.current_disk,
            };
        case StripeAction.CHANGE_PLAN_STATUS:
            return {
                ...state,
                change_plan_status: action.status,
            };
        case StripeAction.CHARGE_STRIPE:
            return {
                ...state,
                vm_created: false,
                amount: action.amount,
                stripe_token: action.token,
            };
        case VMSetupAction.STORE_COMPUTER_SPEC:
            return {
                ...state,
                vm_setup_data: state.vm_setup_data
                    ? { ...state.vm_setup_data, spec: action.spec }
                    : { spec: action.spec },
            };
        case VMSetupAction.STORE_PURCHASE_LOCATION:
            return {
                ...state,
                vm_setup_data: state.vm_setup_data
                    ? { ...state.vm_setup_data, location: action.location }
                    : { location: action.location },
            };
        case VMSetupAction.STORE_PLAN_TYPE:
            return {
                ...state,
                vm_setup_data: state.vm_setup_data
                    ? { ...state.vm_setup_data, plan: action.plan }
                    : { plan: action.plan },
            };
        case VMSetupAction.STORE_SETUP_STEP:
            return {
                ...state,
                vm_setup_data: state.vm_setup_data
                    ? { ...state.vm_setup_data, step: action.step }
                    : { step: action.step },
            };
        case VMSetupAction.STORE_COUNTRY:
            return {
                ...state,
                vm_setup_data: state.vm_setup_data
                    ? { ...state.vm_setup_data, country: action.country }
                    : { country: action.country },
            };
        case VMSetupAction.RESET_SETUP_DATA:
            return {
                ...state,
                vm_setup_data: DASHBOARD_DEFAULT.vm_setup_data,
            };
        case VMSetupAction.STORE_SELECTED_APPS:
            return {
                ...state,
                vm_setup_data: state.vm_setup_data
                    ? { ...state.vm_setup_data, apps: action.apps }
                    : { apps: action.apps },
            };
        case CustomerAction.STORE_USER_REPORT:
            return {
                ...state,
                user_statistics: state.user_statistics
                    ? { ...state.user_statistics, user_report: action.report }
                    : { user_report: action.report },
            };
        case LoginAction.LOGOUT:
            return DASHBOARD_DEFAULT;
        default:
            return state;
    }
}
