export const USER_SIGNUP = "USER_SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const SEND_SIGNUP_EMAIL = "SEND_SIGNUP_EMAIL";
export const VALIDATE_SIGNUP_TOKEN = "VALIDATE_SIGNUP_TOKEN";
export const SUBSCRIBE_NEWSLETTER = "SUBSCRIBE_NEWSLETTER";
export const CHECK_USER_EXISTS = "CHECK_USER_EXISTS";
export const CHECK_VERIFIED_EMAIL = "CHECK_VERIFIED_EMAIL";
export const EMAIL_VERIFIED = "EMAIL_VERIFIED";
export const SEND_VERIFICATION_EMAIL = "SEND_VERIFICATION_EMAIL";
export const STORE_VERIFICATION_TOKEN = "STORE_VERIFICATION_TOKEN";
export const INCREMENT_VERIFICATION_EMAILS_SENT =
    "INCREMENT_VERIFICATION_EMAILS_SENT";

export function userSignup(username, password, name, feedback) {
    return {
        type: USER_SIGNUP,
        username,
        password,
        name,
        feedback,
    };
}

export function signupSuccess() {
    return {
        type: SIGNUP_SUCCESS,
    };
}

export function signupFailure(status) {
    return {
        type: SIGNUP_FAILURE,
        status,
    };
}

export function sendSignupEmail(user, code) {
    return {
        type: SEND_SIGNUP_EMAIL,
        user,
        code,
    };
}

export function validateSignupToken(token) {
    return {
        type: VALIDATE_SIGNUP_TOKEN,
        token,
    };
}

export function subscribeNewsletter(username) {
    return {
        type: SUBSCRIBE_NEWSLETTER,
        username,
    };
}

export function checkUserExists(username) {
    return {
        type: CHECK_USER_EXISTS,
        username,
    };
}

export function checkVerifiedEmail(username) {
    return {
        type: CHECK_VERIFIED_EMAIL,
        username,
    };
}

export function emailVerified(verified) {
    return {
        type: EMAIL_VERIFIED,
        verified,
    };
}

export function sendVerificationEmail(username, token) {
    return {
        type: SEND_VERIFICATION_EMAIL,
        username,
        token,
    };
}

export function incrementVerificationEmailsSent() {
    return {
        type: INCREMENT_VERIFICATION_EMAILS_SENT,
    };
}
