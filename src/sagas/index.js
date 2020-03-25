import { put, takeLatest, takeEvery, all, call, select, delay } from 'redux-saga/effects';
import * as FormAction from "../actions/index.js"
import { apiPost, apiGet } from '../utils/Api.js'
import history from "../history";
import { push } from 'connected-react-router'


function* sendLoginInfo(action) {
   const state = yield select()
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/account/login', {
      username: action.user,
      password: action.password
   })
   if(json) {
	   if (json.verified) {
	     yield put(FormAction.loginSuccess());
       if(!action.create) {
        history.push('/dashboard')
       } 
	   } else {
       yield put(FormAction.loginFailure());
     }
	}
}

function* sendSignupInfo(action) {
   const state = yield select()
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/account/register', {
      username: action.user,
      password: action.password
   });
   if(json) {
     if (json.status === 200) {
       yield put(FormAction.loginSuccess());
       if(!action.create) {
        history.push('/dashboard')
       }
     } else {
       yield put(FormAction.signupFailure(json.status));
     }
  }
}


function* sendStripeCharge(action) {
   const state = yield select()
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/stripe/charge', {
      token: action.token,
      email: state.AccountReducer.user,
      location: action.location
   });
   if(json) {
     if (json.status === 200) {
      history.push('/dashboard');
       yield put(FormAction.vmCreating(true))
       const {json1, response1} = yield call(apiPost, 'https://fractal-mail-server.herokuapp.com/mail/purchase', {
          username: state.AccountReducer.user
       });
     } else {
      yield put(FormAction.stripeFailure(json.status))
     }
  }
}

function* retrieveCustomer(action) {
   const state = yield select()
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/stripe/retrieve', {
      email: state.AccountReducer.user
   });
   if(json) {
     if (json.status === 200) {
       yield put(FormAction.storePayment(json.subscription))
     } else {
       yield put(FormAction.storePayment({}))
     }
  }
}

function* cancelPlan(action) {
   const state = yield select()
   var vm_name = ''
   if(state.AccountReducer.vm_credentials && state.AccountReducer.vm_credentials.length > 0) {
    vm_name = state.AccountReducer.vm_credentials[0].vm_name
   }
   console.log("VM NAME IS " + vm_name)

   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/stripe/cancel', {
      email: state.AccountReducer.user
   });
   if(json) {
     if (json.status === 200) {
       yield put(FormAction.storePayment({}))
       console.log("ABOUT TO RESET USER")
       console.log(json)
       const {json1, response1} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/user/reset', {
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
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/vm/create', {
      vm_size: action.vm_size
   });
   if(json) {
     if (json.ID) {
       yield put(FormAction.getVMStatus(json.ID));
     }
  }
}

function* sendVMID(action) {
   var {json, response} = yield call(apiGet, 'https://cube-celery-vm.herokuapp.com/status/'.concat(action.id))
   const state = yield select()
   console.log(state)
   var percentage = state.AccountReducer.progress
   while(json.state === "PENDING") {
    if(percentage > 90) {
      var {json, response} = yield call(apiGet, 'https://cube-celery-vm.herokuapp.com/status/'.concat(action.id))
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
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/user/register', {
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
   console.log("FETCHING VMS")
   const state = yield select()
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/user/fetchvms', {
    username: state.AccountReducer.user
   })
   console.log(json)
   if(json.vms) {
    yield put(FormAction.vmToState(json.vms));
   } else {
    yield put(FormAction.vmToState([]));
   }
}

function* sendForgotPassword(action) {
   const {json, response} = yield call(apiPost, 'https://fractal-mail-server.herokuapp.com/mail/forgot', {
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
   const {json, response} = yield call(apiPost, 'https://fractal-mail-server.herokuapp.com/token/validate', {
    token: action.token
   })
   if(json) {
    console.log(json)
    if(json.status === 200) {
      console.log('valid')
      yield put(FormAction.tokenStatus('verified'));
    } else {
      if(json.error === 'Expired token') {
        console.log('expiered')
        yield put(FormAction.tokenStatus('expired'));
      }
      else {
        console.log('invalid')
        yield put(FormAction.tokenStatus('invalid'));
      }
    }
   }
}

function* sendResetPassword(action) {
   const {json, response} = yield call(apiPost, 'https://fractal-mail-server.herokuapp.com/mail/reset', {
    username: action.username,
    password: action.password
   })
   history.push('/auth')
}


export default function* rootSaga() {
 	yield all([
    	takeEvery(FormAction.USER_LOGIN, sendLoginInfo),
    	takeEvery(FormAction.USER_SIGNUP, sendSignupInfo),
      takeEvery(FormAction.CHARGE_STRIPE, sendStripeCharge),
      takeEvery(FormAction.CREATE_VM, createVMPost),
      takeEvery(FormAction.GET_VM_ID, sendVMID),
      takeEvery(FormAction.REGISTER_VM, sendVMRegister),
      takeEvery(FormAction.FETCH_VMS, sendVMFetch),
      takeEvery(FormAction.FORGOT_PASSWORD, sendForgotPassword),
      takeEvery(FormAction.VALIDATE_TOKEN, sendValidateToken),
      takeEvery(FormAction.RESET_PASSWORD, sendResetPassword),
      takeEvery(FormAction.RETRIEVE_CUSTOMER, retrieveCustomer),
      takeEvery(FormAction.CANCEL_PLAN, cancelPlan)
	]);
}
