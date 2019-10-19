import * as AccountAction from '../actions/index'

const DEFAULT = {user: '', loggedIn: false}

export default function(state = DEFAULT, action) {
  switch (action.type) {
    case AccountAction.USER_LOGIN:
      return {
        ...state,
	     user: action.user,  
       password: action.password
      }
    case AccountAction.USER_SIGNUP:
      return {
        ...state,
       user: action.user,  
       password: action.password
      }
    case AccountAction.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true 
      }
    default:
      return state
  }
}
