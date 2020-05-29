export const CHANGE_STAGE = "CHANGE_STAGE";
export const CHARGE_STRIPE = "CHARGE_STRIPE";
export const LOGOUT = "LOGOUT";
export const FORGOT_EMAIL = "FORGOT_EMAIL";
export const RETRIEVE_CUSTOMER = "RETRIEVE_CUSTOMER";
export const STORE_PAYMENT = "STORE_PAYMENT";
export const CANCEL_PLAN = "CANCEL_PLAN";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";
export const STRIPE_FAILURE = "STRIPE_FAILURE";
export const CHANGE_TAB = "CHANGE_TAB";
export const SEND_FRIENDS_EMAIL = "SEND_FRIENDS_EMAIL";
export const EMAIL_SENT = "EMAIL_SENT";
export const GET_PROMO_CODE = "GET_PROMO_CODE";
export const STORE_PROMO_CODE = "STORE_PROMO_CODE";
export const STORE_CREDITS = "STORE_CREDITS";
export const VALIDATE_PROMO_CODE = "VALIDATE_PROMO_CODE";
export const PROMO_CODE_FAILURE = "PROMO_CODE_FAILURE";
export const SEND_FINAL_CHARGE = "SEND_FINAL_CHARGE";
export const APPLY_DISCOUNT = "APPLY_DISCOUNT";
export const INCREMENT_VERIFICATION_EMAILS_SENT =
    "INCREMENT_VERIFICATION_EMAILS_SENT";
export const INSERT_CUSTOMER = "INSERT_CUSTOMER";
export const CUSTOMER_CREATED = "CUSTOMER_CREATED";
export const TRIGGER_SURVEY = "TRIGGER_SURVEY";
export const SUBMIT_PURCHASE_FEEDBACK = "SUBMIT_PURCHASE_FEEDBACK";
export const STORE_CUSTOMER = "STORE_CUSTOMER";
export const STORE_ACCOUNT_LOCKED = "STORE_ACCOUNT_LOCKED";
export const STORE_PURCHASE_LOCATION = "STORE_PURCHASE_LOCATION";
export const DASHBOARD_LOADED = "DASHBOARD_LOADED";
export const STORE_ID = "STORE_ID";
export const CHANGE_DISK_STATUS_MESSAGE = "CHANGE_DISK_STATUS_MESSAGE";
export const CHANGE_PLAN = "CHANGE_PLAN";
export const CHANGE_PLAN_STATUS = "CHANGE_PLAN_STATUS"
export const ADD_STORAGE = "ADD_STORAGE";
export const ADD_STORAGE_STATUS = "ADD_STORAGE_STATUS";



export function changeStage(stage) {
    return {
        type: CHANGE_STAGE,
        stage,
    };
}

export function chargeStripe(token, amount, code, plan) {
    return {
        type: CHARGE_STRIPE,
        token,
        amount,
        code,
        plan,
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}

export function retrieveCustomer() {
    return {
        type: RETRIEVE_CUSTOMER,
    };
}

export function storePayment(payload) {
    return {
        type: STORE_PAYMENT,
        payload,
    };
}

export function cancelPlan(message) {
    return {
        type: CANCEL_PLAN,
        message,
    };
}

export function deleteAccount(message) {
    return {
        type: DELETE_ACCOUNT,
        message,
    };
}

export function stripeFailure(status) {
    return {
        type: STRIPE_FAILURE,
        status,
    };
}

export function changeTab(tab) {
    return {
        type: CHANGE_TAB,
        tab,
    };
}

export function sendFriendsEmail(recipients, code) {
    return {
        type: SEND_FRIENDS_EMAIL,
        recipients,
        code,
    };
}

export function emailSent(status) {
    return {
        type: EMAIL_SENT,
        status,
    };
}

export function storePromoCode(code) {
    return {
        type: STORE_PROMO_CODE,
        code,
    };
}

export function getPromoCode(user) {
    return {
        type: GET_PROMO_CODE,
        user,
    };
}

export function storeCredits(credits) {
    return {
        type: STORE_CREDITS,
        credits,
    };
}

export function promoCodeFailure() {
    return {
        type: PROMO_CODE_FAILURE,
    };
}

export function sendFinalCharge(token, amount, code, plan) {
    return {
        type: SEND_FINAL_CHARGE,
        token,
        amount,
        code,
        plan,
    };
}

export function applyDiscount(code) {
    return {
        type: APPLY_DISCOUNT,
        code,
    };
}

export function incrementVerificationEmailsSent() {
    return {
        type: INCREMENT_VERIFICATION_EMAILS_SENT,
    };
}

export function insertCustomer(location) {
    return {
        type: INSERT_CUSTOMER,
        location,
    };
}

export function customerCreated(status) {
    return {
        type: CUSTOMER_CREATED,
        status,
    };
}

export function triggerSurvey(trigger) {
    return {
        type: TRIGGER_SURVEY,
        trigger,
    };
}

export function submitPurchaseFeedback(feedback) {
    return {
        type: SUBMIT_PURCHASE_FEEDBACK,
        feedback,
    };
}

export function storeCustomer(customer) {
    return {
        type: STORE_CUSTOMER,
        customer,
    };
}

export function storeAccountLocked(locked) {
    return {
        type: STORE_ACCOUNT_LOCKED,
        locked,
    };
}


export function storePurchaseLocation(location) {
    return {
        type: STORE_PURCHASE_LOCATION,
        location,
    };
}

export function dashboardLoaded(loaded) {
    return {
        type: DASHBOARD_LOADED,
        loaded,
    };
}

export function storeID(status_id) {
    return {
        type: STORE_ID,
        status_id,
    };
}

export function changePlan(plan) {
    return {
        type: CHANGE_PLAN,
        plan
    }
}

export function changePlanStatus(status) {
    return {
        type: CHANGE_PLAN_STATUS,
        status
    }
}

export function addStorage(storage) {
    return {
        type: ADD_STORAGE,
        storage
    }
}

export function addStorageStatus(status) {
    return {
        type: ADD_STORAGE_STATUS,
        status
    }
}