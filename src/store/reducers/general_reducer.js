import { GENERAL_DEFAULT } from "store/reducers/defaults";

export default function (state = GENERAL_DEFAULT, action) {
    switch (action.type) {
        default:
            return state;
    }
}
