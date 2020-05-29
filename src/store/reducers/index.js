import AccountReducer from "./account_reducer";

import AuthReducer from "store/reducers/auth_reducer";
import DashboardReducer from "store/reducers/dashboard_reducer"

import { combineReducers } from "redux";

const reducers = combineReducers({
	AuthReducer: AuthReducer,
	DashboardReducer: DashboardReducer,
    AccountReducer: AccountReducer,
});

const rootReducer = (state, action) => {
    if (action.type === "RESET_REDUX") {
        state = undefined;
    }

    return reducers(state, action);
};

export default rootReducer;
