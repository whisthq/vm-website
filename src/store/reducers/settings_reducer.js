import * as StorageAction from "store/actions/settings/storage_actions";

import { SETTINGS_DEFAULT } from "store/reducers/defaults";

export default function (state = SETTINGS_DEFAULT, action) {
    switch (action.type) {
        case StorageAction.ADD_STORAGE_STATUS:
            return {
                ...state,
                add_storage_status: action.status,
            };
        default:
            return state;
    }
}
