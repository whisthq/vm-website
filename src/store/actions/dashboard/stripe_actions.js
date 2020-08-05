export const CHARGE_STRIPE = "CHARGE_STRIPE";
export const STORE_PAYMENT = "STORE_PAYMENT";
export const STRIPE_STATUS = "STRIPE_STATUS";
export const SEND_FINAL_CHARGE = "SEND_FINAL_CHARGE";
export const APPLY_DISCOUNT = "APPLY_DISCOUNT";
export const CHANGE_PLAN = "CHANGE_PLAN";
export const CHANGE_PLAN_STATUS = "CHANGE_PLAN_STATUS";
export const CANCEL_PLAN = "CANCEL_PLAN";
export const ADD_CARD = "ADD_CARD";
export const DELETE_CARD = "DELETE_CARD";

export function chargeStripe(token, amount, code, plan) {
    return {
        type: CHARGE_STRIPE,
        token,
        amount,
        code,
        plan,
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

export function stripeStatus(status) {
    return {
        type: STRIPE_STATUS,
        status,
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

export function addCard(sourceId) {
    return {
        type: ADD_CARD,
        sourceId,
    };
}

export function deleteCard(cardId) {
    return {
        type: DELETE_CARD,
        cardId,
    };
}

export function applyDiscount(code) {
    return {
        type: APPLY_DISCOUNT,
        code,
    };
}

export function changePlan(plan) {
    return {
        type: CHANGE_PLAN,
        plan,
    };
}

export function changePlanStatus(status) {
    return {
        type: CHANGE_PLAN_STATUS,
        status,
    };
}
