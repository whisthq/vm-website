import { put, takeEvery, all, call, select, delay } from "redux-saga/effects";
import { apiPost, apiGet } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";
import { formatDate } from "utils/date";

import * as AppsAction from "store/actions/dashboard/appsactions";

function* fetchAppInstallStatus(ID) {
    var { json } = yield call(
        apiGet,
        (config.url.PRIMARY_SERVER + "/status/").concat(ID),
        ""
    );

    while (json.state !== "SUCCESS" && json.state !== "FAILURE") {
        json = yield call(
            apiGet,
            (config.url.PRIMARY_SERVER + "/status/").concat(ID),
            ""
        );
        if (json) {
            json = json.json;
        }
        yield delay(5000);
    }

    if (json && json.output) {
        // TODO
        // yield put(DiskAction.diskCreating(true));
        // yield put(DiskAction.storeCurrentDisk(json.output.disk_name));
        // yield call(attachDisk, json.output.disk_name);
    }
}

function* installApps(action) {
    const state = yield select();
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
