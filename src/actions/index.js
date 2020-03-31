// export const SEND_TOKEN_BACKEND = "SEND_TOKEN_BACKEND";
// export const USER_TOKEN_RECEIVED = "USER_TOKEN_RECEIVED";
// export const LOGIN_COMPLETE = "LOGIN_COMPLETE";

// export function sendFirebaseTokenToPolar(token, email, route = "/dashboard") {
//   return {
//     type: SEND_TOKEN_BACKEND,
//     token,
//     email,
//     route
//   };
// }

export const USER_LOGIN = "USER_LOGIN"
export const USER_SIGNUP = "USER_SIGNUP"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
export const CHANGE_STAGE = "CHANGE_STAGE"
export const CHARGE_STRIPE = "CHARGE_STRIPE"
export const LOGOUT = "LOGOUT"
export const CREATE_VM = "CREATE_VM"
export const GET_VM_ID = "GET_VM_ID"
export const REGISTER_VM = "REGISTER_VM"
export const FETCH_VMS = "FETCH_VMS"
export const VM_TO_STATE = "VM_TO_STATE"
export const VM_CREATING = "VM_CREATING"
export const PROGRESS_BAR = "PROGRESS_BAR"
export const FORGOT_PASSWORD = "FORGOT_PASSWORD"
export const FORGOT_PASSWORD_EMAIL_INCORRECT = "FORGOT_PASSWORD_EMAIL_INCORRECT"
export const FORGOT_PASSWORD_EMAIL_CORRECT = "FORGOT_PASSWORD_EMAIL_CORRECT"
export const VALIDATE_TOKEN = "VALIDATE_TOKEN"
export const TOKEN_STATUS = "TOKEN_STATUS"
export const RESET_PASSWORD = "RESET_PASSWORD"
export const FORGOT_EMAIL = "FORGOT_EMAIL"
export const RETRIEVE_CUSTOMER = "RETRIEVE_CUSTOMER"
export const STORE_PAYMENT = "STORE_PAYMENT"
export const CANCEL_PLAN = "CANCEL_PLAN"
export const SIGNUP_FAILURE = "SIGNUP_FAILURE"
export const STRIPE_FAILURE = "STRIPE_FAILURE"
export const CHANGE_TAB = "CHANGE_TAB"
export const SEND_FRIENDS_EMAIL = "SEND_FRIENDS_EMAIL"
export const EMAIL_SENT = "EMAIL_SENT"
export const GET_PROMO_CODE = "GET_PROMO_CODE"
export const STORE_PROMO_CODE = "STORE_PROMO_CODE"
export const SEND_SIGNUP_EMAIL = "SEND_SIGNUP_EMAIL"
export const STORE_CREDITS = "STORE_CREDITS"
export const VALIDATE_PROMO_CODE = "VALIDATE_PROMO_CODE"
export const PROMO_CODE_FAILURE = "PROMO_CODE_FAILURE"
export const SEND_FINAL_CHARGE = "SEND_FINAL_CHARGE"
export const APPLY_DISCOUNT = "APPLY_DISCOUNT"
export const SUBSCRIBE_NEWSLETTER = "SUBSCRIBE_NEWSLETTER"
export const CHECK_VERIFIED_EMAIL = "CHECK_VERIFIED_EMAIL"
export const EMAIL_VERIFIED = "EMAIL_VERIFIED"
export const VERIFY_TOKEN = "VERIFY_TOKEN"
export const SEND_VERIFICATION_EMAIL = "SEND_VERIFICATION_EMAIL"
export const STORE_VERIFICATION_TOKEN = "STORE_VERIFICATION_TOKEN"
export const INCREMENT_VERIFICATION_EMAILS_SENT = "INCREMENT_VERIFICATION_EMAILS_SENT"

export function userLogin(user, password, create) {
	return {
		type: USER_LOGIN,
		user,
		password,
		create
	}
}

export function userSignup(user, password, create) {
	return {
		type: USER_SIGNUP,
		user, 
		password,
		create
	}
}

export function loginSuccess() {
	return {
		type: LOGIN_SUCCESS
	}
}

export function loginFailure() {
	return {
		type: LOGIN_FAILURE
	}
}

export function signupSuccess() {
	return {
		type: SIGNUP_SUCCESS
	}
}

export function changeStage(stage) {
	return {
		type: CHANGE_STAGE,
		stage
	}
}

export function chargeStripe(token, amount, location, code) {
	return {
		type: CHARGE_STRIPE,
		token,
		amount,
		location,
		code
	}
}

export function logout() {
	return {
		type: LOGOUT
	}
}

export function createVM(vm_size) {
	return {
		type: CREATE_VM,
		vm_size
	}
}

export function getVMStatus(id) {
	return {
		type: GET_VM_ID,
		id
	}
}

export function registerVM(user, vm_name) {
	return {
		type: REGISTER_VM,
		user,
		vm_name
	}
}

export function fetchVMs(user) {
	return {
		type: FETCH_VMS,
		user
	}
}

export function vmToState(vms) {
	return {
		type: VM_TO_STATE,
		vms
	}
}

export function vmCreating(is_creating) {
	return {
		type: VM_CREATING,
		is_creating
	}
}

export function progressBar(progress) {
	return {
		type: PROGRESS_BAR,
		progress
	}
}

export function forgotPassword(username) {
	return {
		type: FORGOT_PASSWORD,
		username
	}
}

export function forgotPasswordEmailIncorrect() {
	console.log("no")
	return {
		type: FORGOT_PASSWORD_EMAIL_INCORRECT,
	}
}

export function forgotPasswordEmailCorrect(username) {
	return {
		type: FORGOT_PASSWORD_EMAIL_CORRECT,
		username
	}
}

export function validateToken(token) {
	return {
		type: VALIDATE_TOKEN,
		token
	}
}

export function tokenStatus(tokenStatus) {
	return {
		type: TOKEN_STATUS,
		tokenStatus
	}
}

export function resetPassword(username, password) {
	return {
		type: RESET_PASSWORD,
		username,
		password
	}
}

export function retrieveCustomer() {
	return {
		type: RETRIEVE_CUSTOMER
	}
}

export function storePayment(payload) {
	return {
		type: STORE_PAYMENT,
		payload
	}
}

export function cancelPlan(message) {
	return {
		type: CANCEL_PLAN,
		message
	}
}

export function signupFailure(status) {
	return {
		type: SIGNUP_FAILURE,
		status
	}
}

export function stripeFailure(status) {
	return {
		type: STRIPE_FAILURE,
		status
	}
}

export function changeTab(tab) {
	return {
		type: CHANGE_TAB,
		tab
	}
}

export function sendFriendsEmail(recipients, code) {
	return {
		type: SEND_FRIENDS_EMAIL,
		recipients,
		code
	}
}

export function emailSent(status) {
	return {
		type: EMAIL_SENT,
		status
	}
}

export function storePromoCode(code) {
	return {
		type: STORE_PROMO_CODE,
		code
	}
}

export function getPromoCode(user) {
	return {
		type: GET_PROMO_CODE,
		user
	}
}

export function sendSignupEmail(user, code) {
	return {
		type: SEND_SIGNUP_EMAIL,
		user,
		code
	}
}

export function storeCredits(credits) {
	return {
		type: STORE_CREDITS,
		credits
	}
}


export function promoCodeFailure() {
	return {
		type: PROMO_CODE_FAILURE
	}
}

export function sendFinalCharge(token, amount, location, code) {
	return {
		type: SEND_FINAL_CHARGE,
		token,
		amount,
		location,
		code
	}
}

export function applyDiscount(code) {
	return {
		type: APPLY_DISCOUNT,
		code
	}
}

export function subscribeNewsletter(username) {
	return {
		type: SUBSCRIBE_NEWSLETTER,
		username
	}
}

export function checkVerifiedEmail(username) {
	return {
		type: CHECK_VERIFIED_EMAIL,
		username
	}
}

export function emailVerified(verified) {
	return {
		type: EMAIL_VERIFIED,
		verified
	}
}

export function verifyToken(token) {
	return {
		type: VERIFY_TOKEN,
		token
	}
}

export function sendVerificationEmail(username, token) {
	return {
		type: SEND_VERIFICATION_EMAIL,
		username,
		token
	}
}

export function storeVerificationToken(token) {
	return {
		type: STORE_VERIFICATION_TOKEN,
		token
	}
}

export function incrementVerificationEmailsSent() {
	return {
		type: INCREMENT_VERIFICATION_EMAILS_SENT
	}
}