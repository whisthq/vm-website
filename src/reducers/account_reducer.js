import * as AccountAction from '../actions/index'

const DEFAULT = {user: '', password: '', loggedIn: false, stage: 1, amount: 25, stripeToken: '', type: '', id: '', vm_created: false}

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
    case AccountAction.SIGNUP_SUCCESS:
      return {
        ...state,
        loggedIn: true 
      }
    case AccountAction.CHANGE_STAGE:
      return {
        ...state,
        vm_created: false,
        stage: action.stage
      }
    case AccountAction.CHARGE_STRIPE:
      return {
        ...state,
        vm_created: false,
        amount: action.amount,
        stripeToken: action.token
      }
    case AccountAction.LOGOUT:
      return {
        ...state,
        loggedIn: false
      }
    case AccountAction.CREATE_VM:
      console.log("create vm reducer");
      return {
        ...state,
        vm_size: action.vm_size
      }
    case AccountAction.GET_VM_ID:
      return {
        ...state,
        id: action.id
      }
    case AccountAction.REGISTER_VM:
      return {
        ...state,
        vm_name: action.vm_name
      }
    default:
      return state
  }
}
