export const CHARGE_STRIPE = "CHARGE_STRIPE";
export const STORE_PAYMENT = "STORE_PAYMENT";
export const STRIPE_FAILURE = "STRIPE_FAILURE";
export const SEND_FINAL_CHARGE = "SEND_FINAL_CHARGE";
export const APPLY_DISCOUNT = "APPLY_DISCOUNT";
export const CHANGE_PLAN = "CHANGE_PLAN";
export const CHANGE_PLAN_STATUS = "CHANGE_PLAN_STATUS";
export const CANCEL_PLAN = "CANCEL_PLAN";

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

export function stripeFailure(status) {
    return {
        type: STRIPE_FAILURE,
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
