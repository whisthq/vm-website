import { put, takeEvery, all, call, select, delay } from "redux-saga/effects";
import { apiPost, apiGet } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";

import * as StorageAction from "store/actions/settings/storage_actions";

function* addStorage(action) {
    const state = yield select();
    if (config.new_server) {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/disk/create",
            {
                username: state.AuthReducer.username,
                disk_size: action.storage,
                resource_group: config.azure.RESOURCE_GROUP,
                location: state.DashboardReducer.disks[0].location,
            },
            state.AuthReducer.access_token
        );

        yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/stripe/addProduct",
            {
                username: state.AuthReducer.username,
                product: action.storage.toString() + "disk",
            },
            state.AuthReducer.access_token
        );

        if (json) {
            if (json.ID) {
                yield call(getStorageStatus, json.ID);
            }
        }
    } else {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/disk/create",
            {
                username: state.AuthReducer.username,
                disk_size: action.storage,
                resource_group: config.azure.RESOURCE_GROUP,
            },
            state.AuthReducer.access_token
        );

        if (json) {
            if (json.ID) {
                yield call(getStorageStatus, json.ID);
            }
        }
    }
}

function* getStorageStatus(ID) {
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

        yield delay(2500);
    }

    if (json && json.state) {
        if (json.state === "SUCCESS") {
            yield put(StorageAction.addStorageStatus(200));
            history.push("/settings");
        } else {
            yield put(StorageAction.addStorageStatus(400));
        }
    }
}

export default function* () {
    yield all([takeEvery(StorageAction.ADD_STORAGE, addStorage)]);
}
