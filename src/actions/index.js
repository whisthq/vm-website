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

export const SEND_FORM_DATA = "SEND_FORM_DATA"
export const ADD_BASE_CUBE = "ADD_BASE_CUBE"
export const ADD_ENHANCED_CUBE = "ADD_ENHANCED_CUBE"
export const ADD_POWER_CUBE = "ADD_POWER_CUBE"
export const CREATE_CART = "CREATE_CART"
export const DELETE_BASE_CUBE = "DELETE_BASE_CUBE"
export const DELETE_ENHANCED_CUBE = "DELETE_ENHANCED_CUBE"
export const DELETE_POWER_CUBE = "DELETE_POWER_CUBE"
export const SEND_PRE_ORDER = "SEND_PRE_ORDER"
export const USER_LOGIN = "USER_LOGIN"
export const USER_SIGNUP = "USER_SIGNUP"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"

export function sendFormData(name, email, cubeType) {
	return {
		type: SEND_FORM_DATA,
		name,
		email,
		cubeType
	};
}

export function addBaseCube() {
	console.log("base")
	return {
		type: ADD_BASE_CUBE
	};
}

export function addEnhancedCube() {
	return {
		type: ADD_ENHANCED_CUBE
	};
}

export function addPowerCube() {
	return {
		type: ADD_POWER_CUBE
	};
}

export function deleteBaseCube() {
	console.log("base")
	return {
		type: DELETE_BASE_CUBE
	};
}

export function deleteEnhancedCube() {
	return {
		type: DELETE_ENHANCED_CUBE
	};
}

export function deletePowerCube() {
	return {
		type: DELETE_POWER_CUBE
	};
}

export function createCart() {
	return {
		type: CREATE_CART
	};
}

export function sendPreOrder(payload) {
	return {
		type: SEND_PRE_ORDER,
		payload
	}
}


export function userLogin(user, password) {
	console.log(user);
	console.log(password);
	return {
		type: USER_LOGIN,
		user,
		password
	}
}

export function userSignup(user, password) {
	return {
		type: USER_SIGNUP,
		user, 
		password
	}
}

export function loginSuccess() {
	return {
		type: LOGIN_SUCCESS
	}
}