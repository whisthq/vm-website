import { put, takeEvery, all, call, select } from "redux-saga/effects";
import { apiPost, apiGet, format } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";

import * as LoginAction from "store/actions/auth/login_actions";
import * as SignupAction from "store/actions/auth/signup_actions";
import * as StripeAction from "store/actions/dashboard/stripe_actions";
import * as CustomerAction from "store/actions/dashboard/customer_actions";
import * as PopupAction from "store/actions/dashboard/popup_actions";
import * as RenderingAction from "store/actions/dashboard/rendering_actions";

function* getPromoCode(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.GRAPHQL,
        {
            query: `{
              users(where: {email: {_eq: "${action.username}"}}) {
                referral_code
              }
            }
          `,
        },
        state.AuthReducer.access_token
    );

    if (json.data && json.data.users) {
        yield put(
            CustomerAction.storePromoCode(json.data.users[0].referral_code)
        );
    }
}

function* insertCustomer(action) {
    const state = yield select();

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/insert",
        {
            username: state.AuthReducer.username,
            location: action.location,
        },
        state.AuthReducer.access_token
    );

    // Start trial
    if (json) {
        yield put(CustomerAction.customerCreated(json.status));
        yield put(CustomerAction.retrieveCustomer());

        history.push("/dashboard");

        yield put(PopupAction.triggerSurvey(true));

        yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/mail/trialStart",
            {
                username: state.AuthReducer.username,
                location: action.location,
                code: state.DashboardReducer.promo_code,
            },
            ""
        );
    }
}

function* retrieveCustomer(action) {
    const state = yield select();

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/retrieve",
        {
            username: state.AuthReducer.username,
        },
        state.AuthReducer.access_token
    );

    if (json) {
        if (json.status === 200) {
            yield put(StripeAction.storePayment(json.subscription));
        } else {
            yield put(StripeAction.storePayment({}));
        }
        yield put(LoginAction.storeAccountLocked(json.account_locked));
        yield put(CustomerAction.storeCustomer(json.customer));
        yield put(CustomerAction.storeCredits(json.creditsOutstanding));
        yield put(RenderingAction.dashboardLoaded(true));
    } else {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/stripe/retrieve",
            {
                username: state.AuthReducer.username,
            },
            state.AuthReducer.access_token
        );

        if (json) {
            if (json.status === 200) {
                yield put(StripeAction.storePayment(json.subscription));
            } else {
                yield put(StripeAction.storePayment({}));
            }
            yield put(LoginAction.storeAccountLocked(json.account_locked));
            yield put(CustomerAction.storeCustomer(json.customer));
            yield put(CustomerAction.storeCredits(json.creditsOutstanding));
            yield put(RenderingAction.dashboardLoaded(true));
        }
    }
}

function* submitPurchaseFeedback(action) {
    const state = yield select();
    yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/mail/feedback",
        {
            username: state.AuthReducer.username,
            feedback: action.feedback,
            type: "Purchase Feedback",
        },
        state.AuthReducer.access_token
    );
}

function* fetchUserReport(action) {
    const state = yield select();
    if (action.start_date > 0) {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/report/userReport",
            {
                username: state.AuthReducer.username,
                start_date: action.start_date,
                timescale: "month",
            },
            state.AuthReducer.access_token
        );

        yield put(CustomerAction.storeUserReport(json));
    } else {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/report/userReport",
            {
                username: state.AuthReducer.username,
                timescale: "month",
            },
            state.AuthReducer.access_token
        );

        yield put(CustomerAction.storeUserReport(json));
    }
}

export default function* () {
    yield all([
        takeEvery(CustomerAction.RETRIEVE_CUSTOMER, retrieveCustomer),
        takeEvery(CustomerAction.GET_PROMO_CODE, getPromoCode),
        takeEvery(CustomerAction.INSERT_CUSTOMER, insertCustomer),
        takeEvery(
            CustomerAction.SUBMIT_PURCHASE_FEEDBACK,
            submitPurchaseFeedback
        ),
        takeEvery(CustomerAction.FETCH_USER_REPORT, fetchUserReport),
    ]);
}
