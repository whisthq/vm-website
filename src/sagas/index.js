import { put, takeEvery, all, call, select, delay } from "redux-saga/effects";
import * as FormAction from "../actions/index.js";
import { apiPost, apiGet } from "../utils/Api.js";
import { config } from "../constants.js";
import history from "../history";

function* sendLoginInfo(action) {
  yield select();
  const { json } = yield call(
    apiPost,
    config.url.PRIMARY_SERVER + "/account/login",
    {
      username: action.user,
      password: action.password,
    }
  );

  if (json) {
    if (json.verified) {
      yield put(FormAction.storeJWT(json.access_token, json.refresh_token));
      yield put(FormAction.loginSuccess());
      yield put(FormAction.storeVerificationToken(json.token));
      yield put(FormAction.checkVerifiedEmail(action.user));
      yield put(FormAction.getPromoCode(action.user));
      if (json.vm_status === "is_creating") {
        yield put(FormAction.vmCreating(true));
      } else {
        yield put(FormAction.vmCreating(false));
      }
    } else {
      yield put(FormAction.loginFailure());
    }
  }
}

function* sendSignupInfo(action) {
  yield select();
  const { json } = yield call(
    apiPost,
    config.url.PRIMARY_SERVER + "/account/register",
    {
      username: action.user,
      password: action.password,
    }
  );

  if (json) {
    if (json.status === 200) {
      yield put(FormAction.storeJWT(json.access_token, json.refresh_token));
      yield put(FormAction.loginSuccess());
      yield put(FormAction.storeVerificationToken(json.token));
      yield put(FormAction.checkVerifiedEmail(action.user));
      yield put(FormAction.getPromoCode(action.user));
      yield put(FormAction.sendVerificationEmail(action.user, json.token));
    } else {
      yield put(FormAction.signupFailure(json.status));
    }
  }
}

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
    yield put(FormAction.sendSignupEmail(action.user, json.code));
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
      FormAction.sendFinalCharge(action.token, action.amount, null, action.plan)
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
    yield put(FormAction.vmCreating(true));
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
      yield put(FormAction.vmCreating(true));
      yield put(FormAction.triggerSurvey(true));
      yield call(
        apiPost,
        config.url.MAIL_SERVER + "/purchase",
        {
          username: state.AccountReducer.user,
          location: action.location,
          code: state.AccountReducer.promoCode,
        },
        ""
      );
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
      yield put(FormAction.vmCreating(false));
      yield put(FormAction.storeDisks([]));
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

function* getDiskStatus(action) {
  const state = yield select();

  var { json } = yield call(
    apiGet,
    (config.url.PRIMARY_SERVER + "/status/").concat(action.id),
    ""
  );

  while (json.state === "PENDING" || json.state === "STARTED") {
    var { json } = yield call(
      apiGet,
      (config.url.PRIMARY_SERVER + "/status/").concat(action.id),
      ""
    );
    yield delay(5000);
  }

  if (json && json.output) {
    yield put(FormAction.fetchDisks(state.AccountReducer.user));
  }
}

function* fetchDisks(action) {
  console.log("FETCH DISK SAGA")
  const state = yield select();
  const { json } = yield call(
    apiPost,
    config.url.PRIMARY_SERVER + "/user/fetchdisks",
    {
      username: state.AccountReducer.user,
    },
    ""
  );

  if (json.disks) {
    yield put(FormAction.storeDisks(json.disks));
  } else {
    yield put(FormAction.storeDisks([]));
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
      yield put(FormAction.forgotPasswordEmailCorrect(action.username));
    } else {
      yield put(FormAction.forgotPasswordEmailIncorrect());
    }
  }
}

function* sendValidateToken(action) {
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
      yield put(FormAction.tokenStatus("verified"));
    } else {
      if (json.error === "Expired token") {
        yield put(FormAction.tokenStatus("expired"));
      } else {
        yield put(FormAction.tokenStatus("invalid"));
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

function* checkVerifiedEmail(action) {
  yield select();
  const { json } = yield call(
    apiPost,
    config.url.PRIMARY_SERVER + "/account/checkVerified",
    {
      username: action.username,
    },
    ""
  );
  if (json && json.status === 200 && json.verified) {
    yield put(FormAction.emailVerified(true));
    history.push("/dashboard");
  } else {
    yield put(FormAction.emailVerified(false));
    history.push("/verify");
  }
}

function* verifyToken(action) {
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
    yield put(FormAction.emailVerified(true));
  } else {
    yield put(FormAction.emailVerified(false));
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

  console.log("DISK RESPOSNE");
  console.log(json);

  if (json) {
    if (json.ID) {
      yield put(FormAction.getDiskStatus(json.ID));
    }
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(FormAction.USER_LOGIN, sendLoginInfo),
    takeEvery(FormAction.USER_SIGNUP, sendSignupInfo),
    takeEvery(FormAction.CHARGE_STRIPE, chargeStripe),
    takeEvery(FormAction.GET_DISK_STATUS, getDiskStatus),
    takeEvery(FormAction.FETCH_DISKS, fetchDisks),
    takeEvery(FormAction.FORGOT_PASSWORD, sendForgotPassword),
    takeEvery(FormAction.VALIDATE_TOKEN, sendValidateToken),
    takeEvery(FormAction.RESET_PASSWORD, sendResetPassword),
    takeEvery(FormAction.RETRIEVE_CUSTOMER, retrieveCustomer),
    takeEvery(FormAction.CANCEL_PLAN, cancelPlan),
    takeEvery(FormAction.DELETE_ACCOUNT, deleteAccount),
    takeEvery(FormAction.SEND_FRIENDS_EMAIL, sendFriendsEmail),
    takeEvery(FormAction.GET_PROMO_CODE, getPromoCode),
    takeEvery(FormAction.SEND_SIGNUP_EMAIL, sendSignupEmail),
    takeEvery(FormAction.SEND_FINAL_CHARGE, sendFinalCharge),
    takeEvery(FormAction.APPLY_DISCOUNT, applyDiscount),
    takeEvery(FormAction.SUBSCRIBE_NEWSLETTER, subscribeNewsletter),
    takeEvery(FormAction.CHECK_VERIFIED_EMAIL, checkVerifiedEmail),
    takeEvery(FormAction.VERIFY_TOKEN, verifyToken),
    takeEvery(FormAction.SEND_VERIFICATION_EMAIL, sendVerificationEmail),
    takeEvery(FormAction.INSERT_CUSTOMER, insertCustomer),
    takeEvery(FormAction.SUBMIT_PURCHASE_FEEDBACK, submitPurchaseFeedback),
    takeEvery(FormAction.CREATE_DISK, createDisk),
  ]);
}
