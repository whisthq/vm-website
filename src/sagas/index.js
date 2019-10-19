import { put, takeLatest, takeEvery, all, call, select } from 'redux-saga/effects';
import * as FormAction from "../actions/index.js"
import { apiPost } from '../utils/Api.js'

function* sendFormData(action) {
   const response = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/form/store', {
     name: action.name,
     email: action.email,
     cubeType: action.cubeType
   });
}

function* sendPreOrder(action) {
   const state = yield select()
   const response = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/order', {
      address1: action.payload.address1,
      address2: action.payload.address2,
      zipcode: action.payload.zipcode,
      name: action.payload.name,
      email: action.payload.email,
      password: action.payload.password,
      order: {base: state.CartReducer.base, enhanced: state.CartReducer.enhanced, power: state.CartReducer.power}
   });
   if (response.status === 200) {
     yield put(FormAction.createCart());
   }
}

function* sendLoginInfo(action) {
   const state = yield select()
   const resp = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/account/login', {
      username: action.user,
      password: action.password
   });
   console.log(resp)
   if(resp) {
	   if (resp.verified) {
	     yield put(FormAction.loginSuccess());
	   }
	}
}

function* sendSignupInfo(action) {
   const state = yield select()
   console.log("signup saga")
}



export default function* rootSaga() {
 	yield all([
    	takeEvery(FormAction.SEND_FORM_DATA, sendFormData),
    	takeEvery(FormAction.SEND_PRE_ORDER, sendPreOrder),
    	takeEvery(FormAction.USER_LOGIN, sendLoginInfo),
    	takeEvery(FormAction.USER_SIGNUP, sendSignupInfo)
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
