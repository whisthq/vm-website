import { put, takeEvery, all, call, select, delay } from "redux-saga/effects";
import { apiPost, apiGet } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";
import { formatDate } from "utils/date";

import * as LoginAction from "store/actions/auth/login_actions";
import * as TokenAction from "store/actions/auth/token_actions";
import * as SignupAction from "store/actions/auth/signup_actions";
import * as DiskAction from "store/actions/dashboard/disk_actions";
import * as StripeAction from "store/actions/dashboard/stripe_actions";
import * as CustomerAction from "store/actions/dashboard/customer_actions";
import * as PopupAction from "store/actions/dashboard/popup_actions";
import * as RenderingAction from "store/actions/dashboard/rendering_actions";
import * as StorageAction from "store/actions/settings/storage_actions";

function* fetchDiskCreationStatus(ID) {
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
        yield put(DiskAction.diskCreating(true));
        yield put(DiskAction.storeCurrentDisk(json.output.disk_name));
        yield call(attachDisk, json.output.disk_name);
    }
}

function* attachDisk(disk_name) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/disk/attach",
        {
            disk_name: disk_name,
        },
        state.AuthReducer.access_token
    );

    console.log(json);

    if (json && json.ID) {
        yield put(DiskAction.storeDiskAttachID(json.ID));
        yield put(DiskAction.fetchDiskAttachStatus(json.ID));
    }
}

function* fetchDiskAttachStatus(action) {
    const state = yield select();
    var { json } = yield call(
        apiGet,
        (config.url.PRIMARY_SERVER + "/status/").concat(
            action.disk_attach_status_id
        ),
        state.AuthReducer.access_token
    );

    while (json.state === "PENDING" || json.state === "STARTED") {
        json = yield call(
            apiGet,
            (config.url.PRIMARY_SERVER + "/status/").concat(
                action.disk_attach_status_id
            ),
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
            yield put(DiskAction.changeDiskStatusMessage(message1));
        }

        yield delay(5000);
    }

    if (json && json.state && json.state === "SUCCESS") {
        yield put(DiskAction.diskCreating(false));
        yield put(DiskAction.fetchDisks(state.DashboardReducer.user));
    }

    if (json && json.state && json.state === "FAILURE") {
        var now2 = new Date();
        var message =
            "(" +
            formatDate(now2.getHours()) +
            ":" +
            formatDate(now2.getMinutes()) +
            ":" +
            formatDate(now2.getSeconds()) +
            ") " +
            "Unexpectedly lost connection with server. Trying again.";
        yield put(DiskAction.changeDiskStatusMessage(message1));
        yield call(attachDisk, state.DashboardReducer.current_disk);
    }
}

function* fetchDisks(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/user/fetchdisks",
        {
            username: state.AuthReducer.username,
            main: false,
        },
        ""
    );

    if (json.disks) {
        yield put(DiskAction.storeDisks(json.disks));
    } else {
        yield put(DiskAction.storeDisks([]));
    }
}

function* createDisk(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/disk/createFromImage",
        {
            username: state.AuthReducer.username,
            location: action.location,
            vm_size: action.vm_size,
            apps: action.apps,
        },
        state.AuthReducer.access_token
    );

    if (json) {
        if (json.ID) {
            yield call(fetchDiskCreationStatus, json.ID);
        }
    }
}

export default function* () {
    yield all([
        takeEvery(DiskAction.FETCH_DISKS, fetchDisks),
        takeEvery(DiskAction.CREATE_DISK, createDisk),
        takeEvery(DiskAction.FETCH_DISK_ATTACH_STATUS, fetchDiskAttachStatus),
    ]);
}
