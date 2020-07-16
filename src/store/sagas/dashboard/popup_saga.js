import { put, takeEvery, all, call, select } from "redux-saga/effects";
import { apiPost } from "utils/Api.js";
import { config } from "utils/constants.js";

import * as PopupAction from "store/actions/dashboard/popup_actions";

function* sendFriendsEmail(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/mail/referral",
        {
            username: state.AuthReducer.username,
            recipients: action.recipients,
            code: action.code,
        },
        state.AuthReducer.access_token
    );
    if (json) {
        yield put(PopupAction.friendsEmailSent(json.status));
    } else {
        yield put(PopupAction.friendsEmailSent(500));
    }
}

export default function* () {
    yield all([takeEvery(PopupAction.SEND_FRIENDS_EMAIL, sendFriendsEmail)]);
}
