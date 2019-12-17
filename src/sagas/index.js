import { put, takeLatest, takeEvery, all, call, select, delay } from 'redux-saga/effects';
import * as FormAction from "../actions/index.js"
import { apiPost, apiGet } from '../utils/Api.js'
import history from "../history";
import { push } from 'connected-react-router'

function* sendFormData(action) {
   const response = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/form/store', {
     name: action.name,
     email: action.email,
     cubeType: action.cubeType
   });
}

function* sendPreOrder(action) {
   const state = yield select()
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/order', {
      address1: action.payload.address1,
      address2: action.payload.address2,
      zipcode: action.payload.zipcode,
      name: action.payload.name,
      email: action.payload.email,
      password: action.payload.password,
      order: {base: state.CartReducer.base, enhanced: state.CartReducer.enhanced, power: state.CartReducer.power}
   });
   if (json.status === 200) {
     yield put(FormAction.createCart());
   }
}

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
       console.log("login failure")
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
     }
  }
}


function* sendStripeCharge(action) {
  console.log("stripe charge sent") 
   const state = yield select()
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/stripe', {
      token: action.token,
      amount: action.amount
   });
   console.log(json)
   if(json) {
     if (json.status === 200) {
      history.push('/dashboard');
       yield put(FormAction.vmCreating(true))
       yield put(FormAction.progressBar(0))
       yield put(FormAction.createVM('Standard_NC6'))
     }
  }
}

function forwardTo(location) {
  history.push(location);
}

function* createVMPost(action) {
   console.log("vm creating")
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
   const state = yield select()
   const {json, response} = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/user/fetchvms', {
    username: state.AccountReducer.user
   })
   if(json.vms) {
    yield put(FormAction.vmToState(json.vms));
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
    	takeEvery(FormAction.SEND_FORM_DATA, sendFormData),
    	takeEvery(FormAction.SEND_PRE_ORDER, sendPreOrder),
    	takeEvery(FormAction.USER_LOGIN, sendLoginInfo),
    	takeEvery(FormAction.USER_SIGNUP, sendSignupInfo),
      takeEvery(FormAction.CHARGE_STRIPE, sendStripeCharge),
      takeEvery(FormAction.CREATE_VM, createVMPost),
      takeEvery(FormAction.GET_VM_ID, sendVMID),
      takeEvery(FormAction.REGISTER_VM, sendVMRegister),
      takeEvery(FormAction.FETCH_VMS, sendVMFetch),
      takeEvery(FormAction.FORGOT_PASSWORD, sendForgotPassword),
      takeEvery(FormAction.VALIDATE_TOKEN, sendValidateToken),
      takeEvery(FormAction.RESET_PASSWORD, sendResetPassword)
	]);
}


//   import {
//   takeEvery,
//   takeLatest,
//   put,
//   call,
//   all,
//   select,
//   debounce,
//   take
// } from "redux-saga/effects";
// import { apiPost, apiGet, apiDelete } from "../utils/Api";
// import * as MainAction from "../actions/index.js";

// // function* fetchNews() {
// //   const json = yield fetch('').then(response => response.json(), );    
// //   yield put({ type: "NEWS_RECEIVED", json: json.articles, });
// // }

// function* requestUserToken(action) {
//   const { json, response } = yield call(apiPost, "/login", {
//     jwt: action.token,
//     email: action.email
//   });

//   if (response.status === 200) {
//     yield put(AuthAction.PolarUserTokenReceived(json));
//   }
// }

// function* logout(action) {
//   yield put(AuthAction.resetRedux());
// }

// function* deleteAccount(action) {
//   const userToken = yield select(state => state.config.userToken);
//   const { json, response } = yield call(apiDelete, "/user", {}, userToken);
//   if (response.status === 200) {
//     yield put(TransactionsAction.getTransactions());
//   }
// }

// export default function*() {
//   yield all([
//     takeEvery(AuthAction.SEND_TOKEN_BACKEND, requestUserToken),
//     takeEvery(FirebaseAction.LOGOUT_FIREBASE_USER, logout),
//     takeEvery(FirebaseAction.DELETE_ACCOUNT, deleteAccount)
//   ]);
// }
