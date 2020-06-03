import * as DiskAction from "store/actions/dashboard/disk_actions";
import * as StripeAction from "store/actions/dashboard/stripe_actions";
import * as CustomerAction from "store/actions/dashboard/customer_actions";
import * as PopupAction from "store/actions/dashboard/popup_actions";
import * as RenderingAction from "store/actions/dashboard/rendering_actions";
import * as AppsAction from "store/actions/dashboard/apps_actions";

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
                disk_disk_is_creating: action.disk_is_creating,
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
        case CustomerAction.STORE_PROMO_CODE:
            return {
                ...state,
                promo_code: action.code,
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
        case CustomerAction.STORE_PURCHASE_LOCATION:
            return {
                ...state,
                purchase_location: action.location,
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
        case AppsAction.CHANGE_APP_INSTALL_STATUS_MESSAGE:
            return {
                ...state,
                app_install_message: action.app_install_message,
            };
        case AppsAction.APPS_INSTALLING:
            return {
                ...state,
                apps_are_installing: action.apps_are_installing,
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
        default:
            return state;
    }
}
