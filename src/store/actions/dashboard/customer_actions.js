export const RETRIEVE_CUSTOMER = "RETRIEVE_CUSTOMER";
export const GET_PROMO_CODE = "GET_PROMO_CODE";
export const STORE_PROMO_CODE = "STORE_PROMO_CODE";
export const STORE_CREDITS = "STORE_CREDITS";
export const VALIDATE_PROMO_CODE = "VALIDATE_PROMO_CODE";
export const PROMO_CODE_FAILURE = "PROMO_CODE_FAILURE";
export const INSERT_CUSTOMER = "INSERT_CUSTOMER";
export const CUSTOMER_CREATED = "CUSTOMER_CREATED";
export const SUBMIT_PURCHASE_FEEDBACK = "SUBMIT_PURCHASE_FEEDBACK";
export const STORE_CUSTOMER = "STORE_CUSTOMER";
export const FETCH_USER_REPORT = "FETCH_USER_REPORT";
export const STORE_USER_REPORT = "STORE_USER_REPORT";

export function retrieveCustomer() {
    return {
        type: RETRIEVE_CUSTOMER,
    };
}

export function storePromoCode(code) {
    return {
        type: STORE_PROMO_CODE,
        code,
    };
}

export function getPromoCode(username) {
    return {
        type: GET_PROMO_CODE,
        username,
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

export function fetchUserReport(start_date) {
    return {
        type: FETCH_USER_REPORT,
        start_date,
    };
}

export function storeUserReport(report) {
    return {
        type: STORE_USER_REPORT,
        report,
    };
}
