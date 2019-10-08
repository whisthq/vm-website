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

export function sendFormData(name, email, cubeType) {
	console.log("action");
	return {
		type: SEND_FORM_DATA,
		name,
		email,
		cubeType
	};
}