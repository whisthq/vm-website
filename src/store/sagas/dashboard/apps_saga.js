import {
    put,
    takeEvery,
    take,
    all,
    call,
    select,
    delay,
} from "redux-saga/effects";
import { apiPost, apiGet } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";
import { formatDate } from "utils/date";

import * as AppsAction from "store/actions/dashboard/apps_actions";

function* waitForDiskCreation(selector, value) {
    let stateSlice = yield select(selector);
    while (stateSlice !== value) {
        console.log(stateSlice);
        yield take();
        stateSlice = yield select(selector);
    }
    console.log("disk created!");
}

function* fetchAppInstallStatus(ID) {
    const state = yield select();

    var { json } = yield call(
        apiGet,
        (config.url.PRIMARY_SERVER + "/status/").concat(ID),
        state.AuthReducer.access_token
    );

    while (json.state === "PENDING" || json.state === "STARTED") {
        json = yield call(
            apiGet,
            (config.url.PRIMARY_SERVER + "/status/").concat(ID),
            state.AuthReducer.access_token
        );

        if (json) {
            json = json.json;
        }

        if (json && json.output && json.state === "PENDING") {
            var now1 = new Date();
            var message1 =
                "(" +
                formatDate(now1.getHours()) +
                ":" +
                formatDate(now1.getMinutes()) +
                ":" +
                formatDate(now1.getSeconds()) +
                ") " +
                json.output.msg;
            yield put(AppsAction.changeAppInstallStatusMessage(message1));
        }

        yield delay(5000);
    }

    if (json && json.state && json.state === "SUCCESS") {
        yield put(AppsAction.appsInstalling(false));
    }

    if (json && json.state && json.state === "FAILURE") {
        var now2 = new Date();
        var message2 =
            "(" +
            formatDate(now2.getHours()) +
            ":" +
            formatDate(now2.getMinutes()) +
            ":" +
            formatDate(now2.getSeconds()) +
            ") " +
            "Unexpectedly lost connection with server. Trying again.";
        yield put(AppsAction.changeAppInstallStatusMessage(message2));
    }
}

function* installApps(action) {
    const state = yield select();

    yield call(waitForDiskCreation, (state) => state.disk_is_creating, false);
    console.log("Installing apps now");

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/vm/installApps",
        {
            username: state.AuthReducer.username,
            apps: action.apps,
        },
        state.AuthReducer.access_token
    );

    if (json) {
        if (json.ID) {
            yield put(AppsAction.appsInstalling(true));
            yield call(fetchAppInstallStatus, json.ID);
        }
    }
}

export default function* () {
    yield all([
        takeEvery(AppsAction.INSTALL_APPS, installApps),
        takeEvery(AppsAction.FETCH_APP_INSTALL_STATUS, fetchAppInstallStatus),
    ]);
}
