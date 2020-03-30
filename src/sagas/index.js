import { put, takeLatest, takeEvery, all, call, select, delay } from 'redux-saga/effects';
import * as FormAction from "../actions/index.js"
import { apiPost, apiGet } from '../utils/Api.js'
import { config } from '../constants.js'
import history from "../history";
import { push } from 'connected-react-router'


function* sendLoginInfo(action) {
   const state = yield select()
   const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/account/login', {
      username: action.user,
      password: action.password
   })
   if(json) {
	   if (json.verified) {
	     yield put(FormAction.loginSuccess())
       yield put(FormAction.getPromoCode(action.user))
       if(json.vm_status === 'is_creating') {
        yield put(FormAction.vmCreating(true))
       } else {
        yield put(FormAction.vmCreating(false))
       }
       if(!action.create) {
        history.push('/dashboard')
       } 
	   } else {
       yield put(FormAction.loginFailure());
     }
	}
}

function* getPromoCode(action) {
   const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/account/fetchCode', {
      username: action.user
   })
   if(json && json.status === 200) {
    yield put(FormAction.sendSignupEmail(action.user, json.code))
    yield put(FormAction.storePromoCode(json.code))
   }
}

function* sendSignupInfo(action) {
   const state = yield select()
   const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/account/register', {
      username: action.user,
      password: action.password
   });
   console.log(json)
   if(json) {
     if (json.status === 200) {
       yield put(FormAction.loginSuccess())
       yield put(FormAction.getPromoCode(action.user))
       if(!action.create) {
        history.push('/dashboard')
       }
     } else {
       yield put(FormAction.signupFailure(json.status));
     }
  }
}

function* sendSignupEmail(action) {
   const {json, response} = yield call(apiPost, config.url.MAIL_SERVER + '/signup', {
      username: action.user,
      code: action.code
   });
}


function* chargeStripe(action) {
  const state = yield select()
  if(action.code != '') {
    const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/referral/validate', {
      code: action.code,
      username: state.AccountReducer.user
    })
    if(!(json && json.status === 200 && json.verified)) {
      yield put(FormAction.promoCodeFailure())
    } else {
      yield put(FormAction.sendFinalCharge(action.token, action.amount, action.location, action.code))
      yield put(FormAction.applyDiscount(action.code))
    }
  } else {
    yield put(FormAction.sendFinalCharge(action.token, action.amount, action.location, null))
  }
}

function* applyDiscount(action) {
  const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/stripe/discount', {
    code: action.code
  })
}

function *sendFinalCharge(action) {
  const state = yield select()
  const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/stripe/charge', {
    token: action.token,
    email: state.AccountReducer.user,
    location: action.location,
    code: action.code
  });

  console.log(json)
  
  if(json) {
   if (json.status === 200) {
    history.push('/dashboard');
     yield put(FormAction.vmCreating(true))
     const {json1, response1} = yield call(apiPost, config.url.MAIL_SERVER + '/purchase', {
        username: state.AccountReducer.user,
        location: action.location,
        code: state.AccountReducer.promoCode
     });
   } else {
    yield put(FormAction.stripeFailure(json.status))
   }
  }
}

function* retrieveCustomer(action) {
   const state = yield select()
   const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/stripe/retrieve', {
      email: state.AccountReducer.user
   });
   console.log(json)
   if(json) {
     if (json.status === 200) {
       yield put(FormAction.storePayment(json.subscription))
       yield put(FormAction.storeCredits(json.creditsOutstanding))
     } else {
       yield put(FormAction.storePayment({}))
       yield put(FormAction.storeCredits(json.creditsOutstanding))
     }
  }
}

function* cancelPlan(action) {
   const state = yield select()
   var vm_name = ''
   if(state.AccountReducer.vm_credentials && state.AccountReducer.vm_credentials.length > 0) {
    vm_name = state.AccountReducer.vm_credentials[0].vm_name
   }

   const {json2, response2} = yield call(apiPost, config.url.MAIL_SERVER + '/cancel', {
      username: state.AccountReducer.user,
      feedback: action.message
   });

   const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/stripe/cancel', {
      email: state.AccountReducer.user
   });

   if(json) {
     if (json.status === 200) {
       yield put(FormAction.storePayment({}))
       yield put(FormAction.vmCreating(false))
       const {json1, response1} = yield call(apiPost, config.url.PRIMARY_SERVER + '/user/reset', {
          username: 'Fractal',
          vm_name: vm_name
       });
       if(json1 && json1.status === 200) {
        yield put(FormAction.fetchVMs(state.AccountReducer.user))
       }
     }
  }
}

function forwardTo(location) {
  history.push(location);
}

function* createVMPost(action) {
   const state = yield select()
   const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/vm/create', {
      vm_size: action.vm_size
   });
   if(json) {
     if (json.ID) {
       yield put(FormAction.getVMStatus(json.ID));
     }
  }
}

function* sendVMID(action) {
   var {json, response} = yield call(apiGet, (config.url.PRIMARY_SERVER + '/status/').concat(action.id))
   const state = yield select()
   console.log(state)
   var percentage = state.AccountReducer.progress
   while(json.state === "PENDING") {
    if(percentage > 90) {
      var {json, response} = yield call(apiGet, (config.url.PRIMARY_SERVER + '/status/').concat(action.id))
    } 
    yield delay(5000)
    if(percentage < 99) {
      yield put(FormAction.progressBar(percentage))
      percentage += 1
    }
   }
   yield put(FormAction.progressBar(100))
   yield put(FormAction.registerVM(state.AccountReducer.user, json.output.vm_name))
}

function* sendVMRegister(action) {
   const state = yield select()
   console.log(action)
   const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/user/register', {
    username: action.user,
    vm_name: action.vm_name
   })
   if(json) {
      yield put(FormAction.vmCreating(false))
      history.push('/dashboard')
      yield put(FormAction.progressBar(1))
   }
}

function* sendVMFetch(action) {
   const state = yield select()
   const {json, response} = yield call(apiPost, config.url.PRIMARY_SERVER + '/user/fetchvms', {
    username: state.AccountReducer.user
   })
   if(json.vms) {
    yield put(FormAction.vmToState(json.vms));
   } else {
    yield put(FormAction.vmToState([]));
   }
}

function* sendForgotPassword(action) {
   const {json, response} = yield call(apiPost, config.url.MAIL_SERVER + '/mail/forgot', {
    username: action.username
   })
   if(json) {
    if(json.verified) {
      yield put(FormAction.forgotPasswordEmailCorrect(action.username));
    } else {
      yield put(FormAction.forgotPasswordEmailIncorrect());
    }
   }
}

function* sendValidateToken(action) {
   const {json, response} = yield call(apiPost, config.url.MAIL_SERVER + '/token/validate', {
    token: action.token
   })
   if(json) {
    if(json.status === 200) {
      yield put(FormAction.tokenStatus('verified'));
    } else {
      if(json.error === 'Expired token') {
        yield put(FormAction.tokenStatus('expired'));
      }
      else {
        yield put(FormAction.tokenStatus('invalid'));
      }
    }
   }
}

function* sendResetPassword(action) {
   const {json, response} = yield call(apiPost, config.url.MAIL_SERVER + '/mail/reset', {
    username: action.username,
    password: action.password
   })
   history.push('/auth')
}

function* sendFriendsEmail(action) {
  const state = yield select()
  const {json, response} = yield call(apiPost, config.url.MAIL_SERVER + '/referral', {
    username: state.AccountReducer.user,
    recipients: action.recipients,
    code: action.code
  })
  if(json) {
    console.log(json)
    yield put(FormAction.emailSent(json.status))
  } else {
    yield put(FormAction.emailSent(500))
  }
}


export default function* rootSaga() {
 	yield all([
    	takeEvery(FormAction.USER_LOGIN, sendLoginInfo),
    	takeEvery(FormAction.USER_SIGNUP, sendSignupInfo),
      takeEvery(FormAction.CHARGE_STRIPE, chargeStripe),
      takeEvery(FormAction.CREATE_VM, createVMPost),
      takeEvery(FormAction.GET_VM_ID, sendVMID),
      takeEvery(FormAction.REGISTER_VM, sendVMRegister),
      takeEvery(FormAction.FETCH_VMS, sendVMFetch),
      takeEvery(FormAction.FORGOT_PASSWORD, sendForgotPassword),
      takeEvery(FormAction.VALIDATE_TOKEN, sendValidateToken),
      takeEvery(FormAction.RESET_PASSWORD, sendResetPassword),
      takeEvery(FormAction.RETRIEVE_CUSTOMER, retrieveCustomer),
      takeEvery(FormAction.CANCEL_PLAN, cancelPlan),
      takeEvery(FormAction.SEND_FRIENDS_EMAIL, sendFriendsEmail),
      takeEvery(FormAction.GET_PROMO_CODE, getPromoCode),
      takeEvery(FormAction.SEND_SIGNUP_EMAIL, sendSignupEmail),
      takeEvery(FormAction.SEND_FINAL_CHARGE, sendFinalCharge),
      takeEvery(FormAction.APPLY_DISCOUNT, applyDiscount)
	]);
}
