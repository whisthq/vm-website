import * as AccountAction from '../actions/index'

const DEFAULT = {user: '', password: '', loggedIn: false, stage: 1, amount: 25, stripeToken: '', type: '', id: '', vm_created: false, is_creating: false, progress: 1, vm_credentials: []}

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
    case AccountAction.VM_TO_STATE:
      return {
        ...state,
        vm_credentials: action.vms
      }
    case AccountAction.VM_CREATING:
      return {
        ...state,
        is_creating: action.is_creating
      }
    case AccountAction.PROGRESS_BAR:
     return {
        ...state,
        progress: action.progress
     }
    default:
      return state
  }
}
