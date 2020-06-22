import * as HomepageAction from "store/actions/general/homepage_actions";

import { GENERAL_DEFAULT } from "store/reducers/defaults";

export default function (state = GENERAL_DEFAULT, action) {
    switch (action.type) {
        case HomepageAction.CHANGE_TAB:
            return {
                ...state,
                current_page: action.tab,
            };
        default:
            return state;
    }
}
