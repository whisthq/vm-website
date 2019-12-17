import * as AccountAction from '../actions/index'

const DEFAULT = {user: '', password: '', loggedIn: false, stage: 1, amount: 25, stripeToken: '', type: '', id: '', vm_created: false, is_creating: false, progress: 1, vm_credentials: [], failed_attempts: 0, forgot_password: 0, token_status: 'invalid'}

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
    case AccountAction.LOGIN_FAILURE:
      return {
        ...state,
        failed_attempts: state.failed_attempts + 1
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
        loggedIn: false,
        user: '',
        password: '',
        stripeToken: '',
        vm_credentials: []
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
    case AccountAction.FORGOT_PASSWORD_EMAIL_INCORRECT:
     return {
        ...state,
        forgot_password: state.forgot_password + 1
     }
    case AccountAction.FORGOT_PASSWORD_EMAIL_CORRECT:
     return {
        ...state,
        forgot_password: state.forgot_password - 1,
        forgot_email: action.username
     }
    case AccountAction.TOKEN_STATUS:
     return {
        ...state,
        token_status: action.tokenStatus
     }
    default:
      return state
  }
}
