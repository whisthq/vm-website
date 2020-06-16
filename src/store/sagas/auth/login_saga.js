import { put, takeEvery, all, call, select } from "redux-saga/effects";
import { apiPost } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";

import * as LoginAction from "store/actions/auth/login_actions";
import * as TokenAction from "store/actions/auth/token_actions";
import * as SignupAction from "store/actions/auth/signup_actions";
import * as DiskAction from "store/actions/dashboard/disk_actions";
import * as CustomerAction from "store/actions/dashboard/customer_actions";

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
            yield put(LoginAction.loginFailure());
        }
    }
}

function* forgotPassword(action) {
    yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/mail/forgot",
        {
            username: action.username,
        },
        ""
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

export default function* () {
    yield all([
        takeEvery(LoginAction.USER_LOGIN, userLogin),
        takeEvery(LoginAction.FORGOT_PASSWORD, forgotPassword),
        takeEvery(LoginAction.RESET_PASSWORD, resetPassword),
    ]);
}
