import { put, takeEvery, all, call, select, delay } from "redux-saga/effects";
import { apiPost, apiGet } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";

import * as LoginAction from "store/actions/auth/login_actions";
import * as TokenAction from "store/actions/auth/token_actions";
import * as SignupAction from "store/actions/auth/signup_actions"
import * as DiskAction from "store/actions/dashboard/disk_actions"

import * as Action from "store/actions/index"

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
            yield put(Action.getPromoCode(action.username));
            if (json.vm_status === "is_creating") {
                yield put(DiskAction.diskCreating(true));
            } else {
                yield put(DiskAction.diskCreating(false));
            }
        } else {
            yield put(LoginAction.loginFailure());
        }
    }
}

function* userSignup(action) {
    yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/register",
        {
            username: action.user,
            password: action.password,
            name: action.name,
            feedback: action.feedback
        }
    );

    if (json) {
        if (json.status === 200) {
            yield put(
                TokenAction.storeJWT(json.access_token, json.refresh_token)
            );
            yield put(LoginAction.loginSuccess());
            yield put(TokenAction.storeVerificationToken(json.token));
            yield call(checkVerifiedEmail, action);
            yield put(Action.getPromoCode(action.user));
            yield put(
                SignupAction.sendVerificationEmail(action.user, json.token)
            );
        } else {
            yield put(SignupAction.signupFailure(json.status));
        }
    }
}

function* checkVerifiedEmail(action) {
    yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/checkVerified",
        {
            username: action.username,
        },
        ""
    );
    if (json && json.status === 200 && json.verified) {
        yield put(SignupAction.emailVerified(true));
        history.push("/dashboard");
    } else {
        yield put(SignupAction.emailVerified(false));
        history.push("/verify");
    }
}

export default function*() {
    yield all([
        takeEvery(LoginAction.USER_LOGIN, userLogin),
        takeEvery(SignupAction.USER_SIGNUP, userSignup),
        takeEvery(SignupAction.CHECK_VERIFIED_EMAIL, checkVerifiedEmail),
    ]);
}
