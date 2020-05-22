import FormReducer from "./form_reducer";
import CartReducer from "./cart_reducer";
import AccountReducer from "./account_reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    FormReducer: FormReducer,
    CartReducer: CartReducer,
    AccountReducer: AccountReducer,
});

const rootReducer = (state, action) => {
    if (action.type === "RESET_REDUX") {
        state = undefined;
    }

    return reducers(state, action);
};

export default rootReducer;
