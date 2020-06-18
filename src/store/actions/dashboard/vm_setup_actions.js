export const STORE_SETUP_STEP        = "STORE_SETUP_STEP";
export const STORE_COUNTRY           = "STORE_COUNTRY";
export const STORE_PURCHASE_LOCATION = "STORE_PURCHASE_LOCATION";
export const STORE_COMPUTER_SPEC     = "STORE_COMPUTER_SPEC";
export const STORE_PLAN_TYPE         = "STORE_PLAN_TYPE";
export const STORE_SELECTED_APPS     = "STORE_SELECTED_APPS";
export const RESET_SETUP_DATA        = "RESET_SETUP_DATA";

export function storeSetupStep(step) {
    return {
        type: STORE_SETUP_STEP,
        step
    }
}

export function storeCountry(country) {
    return {
        type: STORE_COUNTRY,
        country
    }
}

export function storeComputerSpec(spec) {
    return {
        type: STORE_COMPUTER_SPEC,
        spec 
    }
}

export function storePurchaseLocation(location) {
    return {
        type: STORE_PURCHASE_LOCATION,
        location,
    };
}

export function storePlanType(plan) {
    return {
        type: STORE_PLAN_TYPE,
        plan
    }
}

export function resetSetupData() {
    return {
        type: RESET_SETUP_DATA
    }
}

export function storeSelectedApps(apps) {
    return {
        type: STORE_SELECTED_APPS,
        apps
    }
}