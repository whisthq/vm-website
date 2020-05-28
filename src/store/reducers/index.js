import AccountReducer from "./account_reducer";

import LoginReducer from "store/reducers/auth/login_reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
	LoginReducer: LoginReducer,
    AccountReducer: AccountReducer,
});

const rootReducer = (state, action) => {
    if (action.type === "RESET_REDUX") {
        state = undefined;
    }

    return reducers(state, action);
};

export default rootReducer;
