export const USER_LOGIN       = "USER_LOGIN";
export const LOGIN_SUCCESS    = "LOGIN_SUCCESS";
export const LOGIN_FAILURE    = "LOGIN_FAILURE";


export function userLogin(user, password) {
    return {
        type: USER_LOGIN,
        username,
        password
    };
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS,
    };
}

export function loginFailure() {
    return {
        type: LOGIN_FAILURE,
    };
}
