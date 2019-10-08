import { put, takeLatest, takeEvery, all, call } from 'redux-saga/effects';
import * as FormAction from "../actions/index.js"
import { apiPost } from '../utils/Api.js'


function* sendFormData(action) {
   const response = yield call(apiPost, 'https://cube-celery-vm.herokuapp.com/form/store', {
     name: action.name,
     email: action.email,
     cubeType: action.cubeType
   });
}

export default function* rootSaga() {
 	yield all([
    	takeEvery(FormAction.SEND_FORM_DATA, sendFormData),
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
