import * as LoginAction from "store/actions/auth/login_actions";
import * as TokenAction from "store/actions/auth/token_actions";
import * as SignupAction from "store/actions/auth/signup_actions";

import { AUTH_DEFAULT } from "store/reducers/defaults";

export default function (state = AUTH_DEFAULT, action) {
    switch (action.type) {
        case LoginAction.SET_USERNAME:
            return {
                ...state,
                username: action.username,
            };
        case LoginAction.USER_LOGIN:
            return {
                ...state,
                username: action.username,
            };
        case SignupAction.USER_SIGNUP:
            return {
                ...state,
                username: action.username,
            };
        case LoginAction.LOGIN_SUCCESS:
            return {
                ...state,
                logged_in: true,
            };
        case LoginAction.LOGIN_FAILURE:
            return {
                ...state,
                login_status: action.status,
                failed_login_attempts:
                    action.status !== 400 && action.status !== 403
                        ? state.failed_login_attempts
                        : state.failed_login_attempts + 1,
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
                signup_status: action.status,
                failed_signup_attempts:
                    action.status !== 400 && action.status !== 403
                        ? state.failed_signup_attempts
                        : state.failed_signup_attempts + 1,
            };
        case SignupAction.EMAIL_VERIFIED:
            return {
                ...state,
                email_verified: action.verified,
            };
        case TokenAction.STORE_VERIFICATION_TOKEN:
            return {
                ...state,
                verification_token: action.token,
            };
        case SignupAction.INCREMENT_VERIFICATION_EMAILS_SENT:
            return {
                ...state,
                verification_emails_sent: state.verification_emails_sent + 1,
            };
        case LoginAction.STORE_ACCOUNT_LOCKED:
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
        case LoginAction.SET_NEEDSREASON:
            return {
                ...state,
                google_auth: state.google_auth
                    ? {
                          ...state.google_auth,
                          needs_reason: action.needs_reason,
                      }
                    : { needs_reason: action.needs_reason },
            };
        case LoginAction.SET_USEGOOGLE:
            return {
                ...state,
                google_auth: state.google_auth
                    ? { ...state.google_auth, use_google: action.use_google }
                    : { use_google: action.use_google },
            };
        case LoginAction.SHOW_GOOGLE_BUTTON:
            return {
                ...state,
                google_auth: state.google_auth
                    ? { ...state.google_auth, show_google_button: action.show }
                    : { show_google_button: action.show },
            };
        case LoginAction.SET_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case LoginAction.LOGOUT:
            return AUTH_DEFAULT;
        default:
            return state;
    }
}
