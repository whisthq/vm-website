export const TOKEN_STATUS = "TOKEN_STATUS";
export const VALIDATE_RESET_TOKEN = "VALIDATE_RESET_TOKEN";
export const STORE_VERIFICATION_TOKEN = "STORE_VERIFICATION_TOKEN";
export const STORE_JWT = "STORE_JWT";

export function tokenStatus(tokenStatus) {
    return {
        type: TOKEN_STATUS,
        tokenStatus,
    };
}

export function validateResetToken(token) {
    return {
        type: VALIDATE_RESET_TOKEN,
        token,
    };
}

export function storeVerificationToken(token) {
    return {
        type: STORE_VERIFICATION_TOKEN,
        token,
    };
}

export function storeJWT(access_token, refresh_token) {
    return {
        type: STORE_JWT,
        access_token,
        refresh_token,
    };
}
