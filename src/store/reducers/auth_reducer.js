import * as Action from "store/actions/index";
import * as LoginAction from "store/actions/auth/login_actions"
import * as TokenAction from "store/actions/auth/token_actions"
import * as SignupAction from "store/actions/auth/signup_actions"

const DEFAULT = {
    username: "",
    password: "",
    logged_in: false,
    failed_login_attempts: 0,
    forgot_password: 0,
    token_status: "invalid",
    has_vm: false,
    payment: {},
    signupStatus: 200,
    failed_signup_attempts: 0,
    email_verified: false,
    verificationToken: "",
    account_locked: false,
    access_token: "",
    refresh_token: ""
};

export default function (state = DEFAULT, action) {
    switch (action.type) {
        case LoginAction.USER_LOGIN:
            return {
                ...state,
                username: action.username,
                password: action.password,
            };
        case SignupAction.USER_SIGNUP:
            return {
                ...state,
                username: action.username,
                password: action.password,
            };
        case LoginAction.LOGIN_SUCCESS:
            return {
                ...state,
                logged_in: true,
            };
        case LoginAction.LOGIN_FAILURE:
            return {
                ...state,
                failed_login_attempts: state.failed_login_attempts + 1,
            };
        case SignupAction.SIGNUP_SUCCESS:
            return {
                ...state,
                logged_in: true,
            };
        case LoginAction.FORGOT_PASSWORD_EMAIL_INCORRECT:
            return {
                ...state,
                forgot_password: state.forgot_password + 1,
            };
        case LoginAction.FORGOT_PASSWORD_EMAIL_CORRECT:
            return {
                ...state,
                forgot_password: state.forgot_password - 1,
                forgot_email: action.username,
            };
        case SignupAction.SIGNUP_FAILURE:
            return {
                ...state,
                signupStatus: action.status,
                failed_signup_attempts: action.status !== 400 ? state.failed_signup_attempts : state.failed_signup_attempts + 1
            };
        case SignupAction.EMAIL_VERIFIED:
            return {
                ...state,
                email_verified: action.verified,
            };
        case TokenAction.STORE_VERIFICATION_TOKEN:
            return {
                ...state,
                verificationToken: action.token,
            };
        case Action.INCREMENT_VERIFICATION_EMAILS_SENT:
            return {
                ...state,
                verificationEmailsSent: state.verificationEmailsSent + 1,
            };
        case Action.STORE_ACCOUNT_LOCKED:
            return {
                ...state,
                account_locked: action.locked,
            };
        case TokenAction.STORE_JWT:
            return {
                ...state,
                access_token: action.access_token,
                refresh_token: action.refresh_token,
            };
        case TokenAction.TOKEN_STATUS:
            return {
                ...state,
                token_status: action.tokenStatus,
            };
        case Action.LOGOUT:
            return DEFAULT;
        default:
            return state;
    }
}
