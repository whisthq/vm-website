import { put, takeEvery, all, call, select, delay } from "redux-saga/effects";
import * as FormAction from "store/actions/index.js";
import { apiPost, apiGet } from "utils/Api.js";
import { config } from "utils/constants.js";
import history from "utils/history";


import * as LoginAction from "store/actions/auth/login_actions"
import * as TokenAction from "store/actions/auth/token_actions"
import * as SignupAction from "store/actions/auth/signup_actions"
import * as DiskAction from "store/actions/dashboard/disk_actions"

import AuthSaga from "store/sagas/auth_saga"


function* sendVerificationEmail(action) {
    yield select();
    if (action.username !== "" && action.token !== "") {
        const { json } = yield call(
            apiPost,
            config.url.MAIL_SERVER + "/verification",
            {
                username: action.username,
                token: action.token,
            },
            ""
        );
        if (json && json.status === 200) {
            yield put(FormAction.incrementVerificationEmailsSent());
        }
    }
}

function* getPromoCode(action) {
    yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/fetchCode",
        {
            username: action.user,
        },
        ""
    );
    console.log("Promo code");
    console.log(json);
    if (json && json.status === 200) {
        yield put(SignupAction.sendSignupEmail(action.user, json.code));
        yield put(FormAction.storePromoCode(json.code));
    }
}

function* sendSignupEmail(action) {
    const state = yield select();
    if (!state.AccountReducer.email_verified) {
        yield call(
            apiPost,
            config.url.MAIL_SERVER + "/signup",
            {
                username: action.user,
                code: action.code,
            },
            ""
        );
    }
}

function* chargeStripe(action) {
    const state = yield select();

    if (action.code !== "") {
        const { json } = yield call(
            apiPost,
            config.url.PRIMARY_SERVER + "/referral/validate",
            {
                code: action.code,
                username: state.AccountReducer.user,
            },
            state.AccountReducer.access_token
        );
        if (!(json && json.status === 200 && json.verified)) {
            yield put(FormAction.promoCodeFailure());
        } else {
            yield put(
                FormAction.sendFinalCharge(
                    action.token,
                    action.amount,
                    action.code,
                    action.plan
                )
            );
            yield put(FormAction.applyDiscount(action.code));
        }
    } else {
        yield put(
            FormAction.sendFinalCharge(
                action.token,
                action.amount,
                null,
                action.plan
            )
        );
    }
}

function* insertCustomer(action) {
    const state = yield select();

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/insert",
        {
            email: state.AccountReducer.user,
            location: action.location,
        },
        state.AccountReducer.access_token
    );

    // Start trial
    if (json) {
        yield put(FormAction.customerCreated(json.status));
        history.push("/dashboard");
        yield put(FormAction.triggerSurvey(true));
        yield put(DiskAction.diskCreating(true));
        yield call(
            apiPost,
            config.url.MAIL_SERVER + "/trial/start",
            {
                username: state.AccountReducer.user,
                location: action.location,
                code: state.AccountReducer.promoCode,
            },
            ""
        );
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
        state.AccountReducer.access_token
    );
}

function* sendFinalCharge(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/charge",
        {
            token: action.token,
            email: state.AccountReducer.user,
            plan: action.plan,
            code: action.code,
        },
        state.AccountReducer.access_token
    );

    if (json) {
        if (json.status === 200) {
            history.push("/dashboard");
        } else {
            yield put(FormAction.stripeFailure(json.status));
        }
    }
}

function* retrieveCustomer(action) {
    const state = yield select();
    console.log(state);
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/retrieve",
        {
            email: state.AccountReducer.user,
        },
        state.AccountReducer.access_token
    );

    if (json) {
        if (json.status === 200) {
            yield put(FormAction.storePayment(json.subscription));
        } else {
            yield put(FormAction.storePayment({}));
        }
        yield put(FormAction.storeAccountLocked(json.account_locked));
        yield put(FormAction.storeCustomer(json.customer));
        yield put(FormAction.storeCredits(json.creditsOutstanding));
        yield put(FormAction.dashboardLoaded(true));
    }
}

function* cancelPlan(action) {
    const state = yield select();
    // var vm_name = "";
    // if (
    //   state.AccountReducer.vm_credentials &&
    //   state.AccountReducer.vm_credentials.length > 0
    // ) {
    //   vm_name = state.AccountReducer.vm_credentials[0].vm_name;
    // }

    yield call(
        apiPost,
        config.url.MAIL_SERVER + "/cancel",
        {
            username: state.AccountReducer.user,
            feedback: action.message,
        },
        ""
    );

    yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/disk/delete",
        {
            username: state.AccountReducer.user,
        },
        state.AccountReducer.access_token
    );

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/cancel",
        {
            email: state.AccountReducer.user,
        },
        state.AccountReducer.access_token
    );

    if (json) {
        if (json.status === 200) {
            yield put(FormAction.storePayment({}));
            yield put(FormAction.storeCustomer({}));
            yield put(DiskAction.diskCreating(false));
            yield put(DiskAction.storeDisks([]));
        }
    }
}

function* deleteAccount(action) {
    const state = yield select();

    if (state.AccountReducer.has_vm) {
        yield cancelPlan(action);
    }

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/delete",
        {
            username: state.AccountReducer.user,
        },
        state.AccountReducer.access_token
    );

    if (json && json.status === 200) {
        yield put(FormAction.logout());
    }
}

function* fetchDiskCreationStatus(ID) {
    var { json } = yield call(
        apiGet,
        (config.url.PRIMARY_SERVER + "/status/").concat(ID),
        ""
    );

    while (json.state !== "SUCCESS" && json.state !== "FAILURE") {
        json = yield call(
            apiGet,
            (config.url.PRIMARY_SERVER + "/status/").concat(ID),
            ""
        );
        if(json) {
            json = json.json
        }
        yield delay(5000);
    }

    console.log(json)

    if (json && json.output) {
        yield put(DiskAction.diskCreating(true));
        yield put(DiskAction.storeCurrentDisk(json.output.disk_name));
        yield call(attachDisk, json.output.disk_name);
    }
}

function* attachDisk(disk_name) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/disk/attach",
        {
            disk_name: disk_name,
        },
        state.AccountReducer.access_token
    );

    console.log(json)

    if (json && json.ID) {
        yield put(FormAction.storeID(json.ID));
        yield put(DiskAction.fetchDiskAttachStatus(json.ID));
    }
}

function formatDate(num) {
    num = String(num);
    var singleDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (singleDigits.includes(num)) {
        num = "0" + num;
    }
    return num;
}

function* fetchDiskAttachStatus(action) {
    const state = yield select();
    var { json } = yield call(
        apiGet,
        (config.url.PRIMARY_SERVER + "/status/").concat(action.status_id),
        state.AccountReducer.access_token
    );

    while (json.state === "PENDING" || json.state === "STARTED") {
        json = yield call(
            apiGet,
            (config.url.PRIMARY_SERVER + "/status/").concat(action.status_id),
            state.AccountReducer.access_token
        );

        if(json) {
            json = json.json
        }

        if (json && json.output && json.state === "PENDING") {
            var now1 = new Date();
            var message1 =
                "(" +
                formatDate(now1.getHours()) +
                ":" +
                formatDate(now1.getMinutes()) +
                ":" +
                formatDate(now1.getSeconds()) +
                ") " +
                json.output.msg;
            yield put(DiskAction.changeDiskStatusMessage(message1));
        }

        console.log(json);

        yield delay(5000);
    }

    if (json && json.state && json.state === "SUCCESS") {
        yield put(DiskAction.diskCreating(false));
        yield put(DiskAction.fetchDisks(state.AccountReducer.user));
    }

    if (json && json.state && json.state === "FAILURE") {
        // var now2 = new Date(); // TODO: NEVER CALLED, IS THIS STILL NEEDED?
        // var message =
        //     "(" +
        //     formatDate(now2.getHours()) +
        //     ":" +
        //     formatDate(now2.getMinutes()) +
        //     ":" +
        //     formatDate(now2.getSeconds()) +
        //     ") " +
        //     "Unexpectedly lost connection with server. Trying again.";
        yield call(attachDisk, state.AccountReducer.current_disk);
    }
}

function* fetchDisks(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/user/fetchdisks",
        {
            username: state.AccountReducer.user,
            main: false
        },
        ""
    );

    if (json.disks) {
        yield put(DiskAction.storeDisks(json.disks));
    } else {
        yield put(DiskAction.storeDisks([]));
    }
}

function* sendForgotPassword(action) {
    yield select();
    const { json } = yield call(
        apiPost,
        config.url.MAIL_SERVER + "/mail/forgot",
        {
            username: action.username,
        },
        ""
    );
    if (json) {
        if (json.verified) {
            yield put(LoginAction.forgotPasswordEmailCorrect(action.username));
        } else {
            yield put(LoginAction.forgotPasswordEmailIncorrect(null));
        }
    }
}

function* validateResetToken(action) {
    yield select();
    const { json } = yield call(
        apiPost,
        config.url.MAIL_SERVER + "/token/validate",
        {
            token: action.token,
        },
        ""
    );
    if (json) {
        if (json.status === 200) {
            yield put(TokenAction.tokenStatus("verified"));
        } else {
            if (json.error === "Expired token") {
                yield put(TokenAction.tokenStatus("expired"));
            } else {
                yield put(TokenAction.tokenStatus("invalid"));
            }
        }
    }
}

function* sendResetPassword(action) {
    yield select();
    console.log(action);
    yield call(
        apiPost,
        config.url.MAIL_SERVER + "/mail/reset",
        {
            username: action.username,
            password: action.password,
        },
        ""
    );
    history.push("/auth");
}

function* sendFriendsEmail(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.MAIL_SERVER + "/referral",
        {
            username: state.AccountReducer.user,
            recipients: action.recipients,
            code: action.code,
        },
        ""
    );
    if (json) {
        console.log(json);
        yield put(FormAction.emailSent(json.status));
    } else {
        yield put(FormAction.emailSent(500));
    }
}

function* subscribeNewsletter(action) {
    yield call(
        apiPost,
        config.url.MAIL_SERVER + "/newsletter/subscribe",
        {
            username: action.username,
        },
        ""
    );
}


function* validateSignupToken(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/verifyUser",
        {
            username: state.AccountReducer.user,
            token: action.token,
        },
        state.AccountReducer.access_token
    );
    if (json && json.status === 200 && json.verified) {
        yield put(SignupAction.emailVerified(true));
    } else {
        yield put(SignupAction.emailVerified(false));
    }
}

function* submitPurchaseFeedback(action) {
    const state = yield select();
    yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/feedback",
        {
            username: state.AccountReducer.user,
            feedback: action.feedback,
        },
        state.AccountReducer.access_token
    );
}

function* createDisk(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/disk/createFromImage",
        {
            username: state.AccountReducer.user,
            location: action.location,
            vm_size: action.vm_size,
        },
        state.AccountReducer.access_token
    );

    if (json) {
        if (json.ID) {
            yield call(fetchDiskCreationStatus, json.ID);
        }
    }
}

function* changePlan(action) {
    const state = yield select();
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/stripe/update",
        {
            username: state.AccountReducer.user,
            plan: action.plan 
        },
        state.AccountReducer.access_token
    );

    if(json) {
        yield put(FormAction.changePlanStatus(json.status))

        if(json.status === 200) {
            history.push("/dashboard")
        }
    }
}

function* addStorage(action) {
    const state = yield select(); 

    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/disk/createEmpty",
        {
            username: state.AccountReducer.user,
            disk_size: action.storage
        },
        state.AccountReducer.access_token
    )

    console.log(json)

    if (json) {
        if (json.ID) {
            yield call(getStorageStatus, json.ID)
        }
    }
}

function* getStorageStatus(ID) {
    var { json } = yield call(
        apiGet,
        (config.url.PRIMARY_SERVER + "/status/").concat(ID),
        ""
    );

    while (json.state !== "SUCCESS" && json.state !== "FAILURE") {
        json = yield call(
            apiGet,
            (config.url.PRIMARY_SERVER + "/status/").concat(ID),
            ""
        );

        if(json) {
            json = json.json 
        }

        yield delay(2500);
    }

    if (json && json.state) {
        if(json.state === "SUCCESS") {
            yield put(FormAction.addStorageStatus(200))
            history.push("/settings")
        } else {
            yield put(FormAction.addStorageStatus(400))
        }
    }
}

function* checkUserExists(action) {
    const { json } = yield call(
        apiPost,
        config.url.PRIMARY_SERVER + "/account/lookup",
        {
            username: action.username 
        },
        ""
    )

    if(json) {
        if(json.exists) {
            yield put(SignupAction.signupFailure(400));
        } else {
            yield put(SignupAction.signupFailure(200));
        }
    }
}

export default function* rootSaga() {
    yield all([
        AuthSaga(),
        takeEvery(FormAction.CHARGE_STRIPE, chargeStripe),
        takeEvery(DiskAction.FETCH_DISKS, fetchDisks),
        takeEvery(LoginAction.FORGOT_PASSWORD, sendForgotPassword),
        takeEvery(TokenAction.VALIDATE_RESET_TOKEN, validateResetToken),
        takeEvery(LoginAction.RESET_PASSWORD, sendResetPassword),
        takeEvery(FormAction.RETRIEVE_CUSTOMER, retrieveCustomer),
        takeEvery(FormAction.CANCEL_PLAN, cancelPlan),
        takeEvery(FormAction.DELETE_ACCOUNT, deleteAccount),
        takeEvery(FormAction.SEND_FRIENDS_EMAIL, sendFriendsEmail),
        takeEvery(FormAction.GET_PROMO_CODE, getPromoCode),
        takeEvery(SignupAction.SEND_SIGNUP_EMAIL, sendSignupEmail),
        takeEvery(FormAction.SEND_FINAL_CHARGE, sendFinalCharge),
        takeEvery(FormAction.APPLY_DISCOUNT, applyDiscount),
        takeEvery(SignupAction.SUBSCRIBE_NEWSLETTER, subscribeNewsletter),
        takeEvery(SignupAction.VALIDATE_SIGNUP_TOKEN, validateSignupToken),
        takeEvery(SignupAction.SEND_VERIFICATION_EMAIL, sendVerificationEmail),
        takeEvery(FormAction.INSERT_CUSTOMER, insertCustomer),
        takeEvery(FormAction.SUBMIT_PURCHASE_FEEDBACK, submitPurchaseFeedback),
        takeEvery(DiskAction.CREATE_DISK, createDisk),
        takeEvery(DiskAction.FETCH_DISK_ATTACH_STATUS, fetchDiskAttachStatus),
        takeEvery(FormAction.CHANGE_PLAN, changePlan),
        takeEvery(FormAction.ADD_STORAGE, addStorage),
        takeEvery(SignupAction.CHECK_USER_EXISTS, checkUserExists)
    ]);
}
