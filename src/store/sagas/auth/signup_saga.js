import { put, takeEvery, all, call, select } from "redux-saga/effects";
import { apiPost } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";

import * as LoginAction from "store/actions/auth/login_actions";
import * as TokenAction from "store/actions/auth/token_actions";
import * as SignupAction from "store/actions/auth/signup_actions";
import * as CustomerAction from "store/actions/dashboard/customer_actions";

function* userSignup(action) {
    yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/register",
        {
            username: action.username,
            password: action.password,
            name: action.name,
            feedback: action.feedback,
        }
    );

    if (json) {
        if (json.status === 200) {
            yield put(
                SignupAction.sendVerificationEmail(action.username, json.token)
            );
            yield put(
                TokenAction.storeJWT(json.access_token, json.refresh_token)
            );
            yield put(LoginAction.loginSuccess());
            yield put(TokenAction.storeVerificationToken(json.token));
            yield put(SignupAction.checkVerifiedEmail(action.username));
            yield put(CustomerAction.getPromoCode(action.username));
        } else {
            yield put(SignupAction.signupFailure(json.status));
            yield put(LoginAction.loginFailure(json.status));
        }
    }
}

function* checkVerifiedEmail(action) {
    yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/verified",
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

function* subscribeNewsletter(action) {
    yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/newsletter/subscribe",
        {
            username: action.username,
        },
        ""
    );
}

function* validateSignupToken(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/verify",
        {
            username: state.AuthReducer.username,
            token: action.token,
        },
        state.AuthReducer.access_token
    );
    if (json && json.status === 200 && json.verified) {
        yield put(SignupAction.emailVerified(true));
    } else {
        yield put(SignupAction.emailVerified(false));
    }
}

function* sendVerificationEmail(action) {
    yield select();
    if (action.username !== "" && action.token !== "") {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/mail/verification",
            {
                username: action.username,
                token: action.token,
            },
            ""
        );
        if (json && json.status === 200) {
            yield put(SignupAction.incrementVerificationEmailsSent());
        }
    }
}

function* checkUserExists(action) {
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/lookup",
        {
            username: action.username,
        },
        ""
    );

    if (json) {
        if (json.exists) {
            yield put(SignupAction.signupFailure(400));
        } else {
            yield put(SignupAction.signupFailure(200));
        }
    }
}

export default function* () {
    yield all([
        takeEvery(SignupAction.USER_SIGNUP, userSignup),
        takeEvery(SignupAction.CHECK_VERIFIED_EMAIL, checkVerifiedEmail),
        takeEvery(SignupAction.SUBSCRIBE_NEWSLETTER, subscribeNewsletter),
        takeEvery(SignupAction.VALIDATE_SIGNUP_TOKEN, validateSignupToken),
        takeEvery(SignupAction.SEND_VERIFICATION_EMAIL, sendVerificationEmail),
        takeEvery(SignupAction.CHECK_USER_EXISTS, checkUserExists),
    ]);
}
