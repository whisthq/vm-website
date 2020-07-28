import { put, takeEvery, all, call, select } from "redux-saga/effects";
import { apiPost } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";

import * as DiskAction from "store/actions/dashboard/disk_actions";
import * as StripeAction from "store/actions/dashboard/stripe_actions";
import * as CustomerAction from "store/actions/dashboard/customer_actions";

function* chargeStripe(action) {
    const state = yield select();

    if (action.code !== "") {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/stripe/referral",
            {
                code: action.code,
                username: state.AuthReducer.username,
            },
            state.AuthReducer.access_token
        );
        if (!(json && json.status === 200 && json.verified)) {
            console.log("promo code failure");
            yield put(CustomerAction.promoCodeFailure());
        } else {
            yield put(
                StripeAction.sendFinalCharge(
                    action.token,
                    action.amount,
                    action.code,
                    action.plan
                )
            );
            yield put(StripeAction.applyDiscount(action.code));
            yield put(DiskAction.diskCreating(true));
        }
    } else {
        yield put(
            StripeAction.sendFinalCharge(
                action.token,
                action.amount,
                null,
                action.plan
            )
        );
        yield put(DiskAction.diskCreating(true));
    }
}

function* applyDiscount(action) {
    const state = yield select();
    yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/discount",
        {
            code: action.code,
        },
        state.AuthReducer.access_token
    );
}

function* sendFinalCharge(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/charge",
        {
            token: action.token,
            username: state.AuthReducer.username,
            plan: action.plan,
            code: action.code,
        },
        state.AuthReducer.access_token
    );

    if (json) {
        if (json.status === 200) {
            history.push("/dashboard");
        } else {
            yield put(StripeAction.stripeFailure(json.status));
        }
    }
}

function* cancelPlan(action) {
    const state = yield select();

    yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/mail/cancel",
        {
            username: state.AuthReducer.username,
            feedback: action.message,
        },
        ""
    );

    if (config.new_server) {
        yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/azure_disk/delete",
            {
                username: state.AuthReducer.username,
                resource_group: config.azure.RESOURCE_GROUP,
            },
            state.AuthReducer.access_token
        );
    } else {
        yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/disk/delete",
            {
                username: state.AuthReducer.username,
                resource_group: config.azure.RESOURCE_GROUP,
            },
            state.AuthReducer.access_token
        );
    }

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/cancel",
        {
            username: state.AuthReducer.username,
        },
        state.AuthReducer.access_token
    );

    if (json) {
        if (json.status === 200) {
            yield put(StripeAction.storePayment({}));
            yield put(CustomerAction.storeCustomer({}));
            yield put(DiskAction.diskCreating(false));
            yield put(DiskAction.storeDisks([]));
        }
    }
}

function* changePlan(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/update",
        {
            username: state.AuthReducer.username,
            plan: action.plan,
        },
        state.AuthReducer.access_token
    );

    if (json) {
        yield put(StripeAction.changePlanStatus(json.status));

        if (json.status === 200) {
            history.push("/dashboard");
        }
    }
}

function* addCard(action) {
    const state = yield select();
    yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/addCard",
        {
            custId: state.DashboardReducer.customer.id,
            sourceId: action.sourceId,
        },
        state.AuthReducer.access_token
    );
    yield put(CustomerAction.retrieveCustomer());
}

function* deleteCard(action) {
    const state = yield select();
    yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/deleteCard",
        {
            custId: state.DashboardReducer.customer.id,
            cardId: action.cardId,
        },
        state.AuthReducer.access_token
    );
    yield put(CustomerAction.retrieveCustomer());
}

export default function* () {
    yield all([
        takeEvery(StripeAction.CHARGE_STRIPE, chargeStripe),
        takeEvery(StripeAction.CANCEL_PLAN, cancelPlan),
        takeEvery(StripeAction.SEND_FINAL_CHARGE, sendFinalCharge),
        takeEvery(StripeAction.APPLY_DISCOUNT, applyDiscount),
        takeEvery(StripeAction.CHANGE_PLAN, changePlan),
        takeEvery(StripeAction.ADD_CARD, addCard),
        takeEvery(StripeAction.DELETE_CARD, deleteCard),
    ]);
}
