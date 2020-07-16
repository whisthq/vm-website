import { put, takeEvery, all, call, select } from "redux-saga/effects";
import { apiPost } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";

import * as LoginAction from "store/actions/auth/login_actions";
import * as TokenAction from "store/actions/auth/token_actions";
import * as SignupAction from "store/actions/auth/signup_actions";
import * as DiskAction from "store/actions/dashboard/disk_actions";
import * as CustomerAction from "store/actions/dashboard/customer_actions";

function* googleLogin(action) {
    yield select();

    if (action.code) {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/google/login",
            {
                code: action.code,
            }
        );
        if (json) {
            if (json.status === 200) {
                console.log(json);
                yield put(LoginAction.setUseGoogle(true));
                yield put(
                    TokenAction.storeJWT(json.access_token, json.refresh_token)
                );
                yield put(LoginAction.setUsername(json.username));
                yield put(SignupAction.emailVerified(true));
                yield put(CustomerAction.getPromoCode(json.username));

                if (json.new_user) {
                    yield put(LoginAction.setNeedsReason(true));
                } else {
                    if (json.vm_status === "is_creating") {
                        yield put(DiskAction.diskCreating(true));
                    } else {
                        yield put(DiskAction.diskCreating(false));
                    }
                    yield put(LoginAction.loginSuccess());
                    history.push("/dashboard");
                }
            } else {
                yield put(LoginAction.setError(json.error));
                yield put(SignupAction.signupFailure(json.status));
                yield put(LoginAction.loginFailure(json.status));
            }
        }
    } else {
        yield put(LoginAction.loginFailure(400));
        yield put(SignupAction.signupFailure(400));
    }
}

function* googleReason(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/google/reason",
        {
            reason: action.reason,
            username: state.AuthReducer.username,
        }
    );

    if (json && json.status === 200) {
        yield put(LoginAction.loginSuccess());
        history.push("/dashboard");
    }
}

function* userLogin(action) {
    yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/login",
        {
            username: action.username,
            password: action.password,
        }
    );

    if (json) {
        if (json.verified) {
            yield put(
                TokenAction.storeJWT(json.access_token, json.refresh_token)
            );
            yield put(LoginAction.loginSuccess());
            yield put(TokenAction.storeVerificationToken(json.token));
            yield put(SignupAction.checkVerifiedEmail(action.username));
            yield put(CustomerAction.getPromoCode(action.username));
        } else {
            yield put(LoginAction.setError(json.error));
            yield put(LoginAction.loginFailure(400));
        }
    }
}

function* forgotPassword(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/mail/forgot",
        {
            username: action.username,
        },
        state.AccountReducer.access_token
    );
    if (json) {
        if (json.verified) {
            yield put(LoginAction.forgotPasswordEmailCorrect(action.username));
        } else {
            yield put(LoginAction.forgotPasswordEmailIncorrect(null));
        }
    }
}

function* resetPassword(action) {
    yield select();
    if (config.new_server) {
        yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/account/resetPassword",
            {
                username: action.username,
                password: action.password,
            },
            ""
        );
        history.push("/auth");
    } else {
        yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/mail/reset",
            {
                username: action.username,
                password: action.password,
            },
            ""
        );
        history.push("/auth");
    }
}

export default function* () {
    yield all([
        takeEvery(LoginAction.GOOGLE_LOGIN, googleLogin),
        takeEvery(LoginAction.GOOGLE_REASON, googleReason),
        takeEvery(LoginAction.USER_LOGIN, userLogin),
        takeEvery(LoginAction.FORGOT_PASSWORD, forgotPassword),
        takeEvery(LoginAction.RESET_PASSWORD, resetPassword),
    ]);
}
