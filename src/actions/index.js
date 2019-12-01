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

export function chargeStripe(token, amount) {
	return {
		type: CHARGE_STRIPE,
		token,
		amount
	}
}

export function logout() {
	return {
		type: LOGOUT
	}
}

export function createVM(vm_size) {
	console.log("create vm action");
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