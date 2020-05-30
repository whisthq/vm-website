import { put, takeEvery, all, call, select, delay } from "redux-saga/effects";
import { apiPost, apiGet } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";

import * as LoginAction from "store/actions/auth/login_actions";
import * as TokenAction from "store/actions/auth/token_actions";
import * as SignupAction from "store/actions/auth/signup_actions"
import * as DiskAction from "store/actions/dashboard/disk_actions"
import * as CustomerAction from "store/actions/dashboard/customer_actions"


function* validateResetToken(action) {
    yield select();
    const { json } = yield call(
        apiPost,
        config.url.MAIL_SERVER + "/token/validate",
        {
            token: action.token,
        },
        ""
    );
    if (json) {
        if (json.status === 200) {
            yield put(TokenAction.tokenStatus("verified"));
        } else {
            if (json.error === "Expired token") {
                yield put(TokenAction.tokenStatus("expired"));
            } else {
                yield put(TokenAction.tokenStatus("invalid"));
            }
        }
    }
}


export default function*() {
    yield all([
        takeEvery(TokenAction.VALIDATE_RESET_TOKEN, validateResetToken),
    ]);
}
