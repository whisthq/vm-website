import AuthReducer from "store/reducers/auth_reducer";
import DashboardReducer from "store/reducers/dashboard_reducer";
import SettingsReducer from "store/reducers/settings_reducer";
import GeneralReducer from "store/reducers/general_reducer";

import { combineReducers } from "redux";

const reducers = combineReducers({
	AuthReducer: AuthReducer,
	DashboardReducer: DashboardReducer,
	SettingsReducer: SettingsReducer,
	GeneralReducer: GeneralReducer,
});

const rootReducer = (state, action) => {
    if (action.type === "RESET_REDUX") {
        state = undefined;
    }

    return reducers(state, action);
};

export default rootReducer;
