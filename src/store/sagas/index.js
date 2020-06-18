import { all } from "redux-saga/effects";

import LoginSaga from "store/sagas/auth/login_saga";
import SignupSaga from "store/sagas/auth/signup_saga";
import TokenSaga from "store/sagas/auth/token_saga";
import StripeSaga from "store/sagas/dashboard/stripe_saga";
import CustomerSaga from "store/sagas/dashboard/customer_saga";
import DiskSaga from "store/sagas/dashboard/disk_saga";
import PopupSaga from "store/sagas/dashboard/popup_saga";
import StorageSaga from "store/sagas/settings/storage_saga";


export default function* rootSaga() {
    yield all([
        LoginSaga(),
        SignupSaga(),
        TokenSaga(),
        StripeSaga(),
        CustomerSaga(),
        DiskSaga(),
        PopupSaga(),
        StorageSaga(),
    ]);
}