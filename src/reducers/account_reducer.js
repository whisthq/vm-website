import * as AccountAction from '../actions/index'

const DEFAULT = {user: '', password: '', loggedIn: false, stage: 1, amount: 25, stripeToken: '', type: '', id: '', vm_created: false, is_creating: false, progress: 1, 
                 disks: [], failed_login_attempts: 0, forgot_password: 0, token_status: 'invalid', has_vm: false, 
                 payment: {}, signupStatus: 200, failed_signup_attempts: 0, stripeStatus: 200, failed_payment_attempts: 0,
                 currentPage: 'personal', emailStatus: 0, promoCode: '', credits: 0, failed_referral_attempts: 0, 
                 email_verified: false, verificationToken: '', verificationEmailsSent: 0, customer_status: 0, show_survey: false,
                 customer: {}, account_locked: false, access_token: '', refresh_token: '', purchase_location: ''}

export default function (state = DEFAULT, action) {
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
        failed_login_attempts: state.failed_login_attempts + 1
      }
    case AccountAction.PROMO_CODE_FAILURE:
      return {
        ...state,
        failed_referral_attempts: state.failed_referral_attempts + 1
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
      return DEFAULT
    case AccountAction.STORE_DISKS:
      return {
        ...state,
        disks: action.disks
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
    case AccountAction.STORE_PAYMENT:
      return {
        ...state,
        payment: action.payload
      }
    case AccountAction.SIGNUP_FAILURE:
      return {
        ...state,
        signupStatus: action.status,
        failed_signup_attempts: state.failed_signup_attempts + 1
      }
    case AccountAction.STRIPE_FAILURE:
      return {
        ...state,
        stripeStatus: action.status,
        failed_payment_attempts: state.failed_payment_attempts + 1
      }
    case AccountAction.CHANGE_TAB:
      return {
        ...state,
        currentPage: action.tab
      }
    case AccountAction.EMAIL_SENT:
      return {
        ...state,
        emailStatus: action.status
      }
    case AccountAction.STORE_PROMO_CODE:
      return {
        ...state,
        promoCode: action.code
      }
    case AccountAction.STORE_CREDITS:
      return {
        ...state,
        credits: action.credits
      }
    case AccountAction.EMAIL_VERIFIED:
      return {
        ...state,
        email_verified: action.verified
      }
    case AccountAction.STORE_VERIFICATION_TOKEN:
      return {
        ...state,
        verificationToken: action.token
      }
    case AccountAction.INCREMENT_VERIFICATION_EMAILS_SENT:
      return {
        ...state,
        verificationEmailsSent: state.verificationEmailsSent + 1
      }
    case AccountAction.CUSTOMER_CREATED:
      return {
        ...state,
        customer_status: action.status
      }
    case AccountAction.TRIGGER_SURVEY:
      return {
        ...state,
        show_survey: action.trigger
      }
    case AccountAction.STORE_CUSTOMER:
      return {
        ...state,
        customer: action.customer
      }
    case AccountAction.STORE_ACCOUNT_LOCKED:
      return {
        ...state,
        account_locked: action.locked
      }
    case AccountAction.CANCEL_PLAN:
      return {
        ...state,
        show_survey: false
      }
    case AccountAction.STORE_JWT:
      return {
        ...state,
        access_token: action.access_token,
        refresh_token: action.refresh_token
      }
    case AccountAction.STORE_PURCHASE_LOCATION:
      return {
        ...state,
        purchase_location: action.location
      }
    default:
      return state
  }
}
