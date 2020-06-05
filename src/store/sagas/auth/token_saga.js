import { put, takeEvery, all, call, select } from "redux-saga/effects";
import { apiPost } from "utils/Api.js";
import { config } from "utils/constants.js";

import * as TokenAction from "store/actions/auth/token_actions";


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
