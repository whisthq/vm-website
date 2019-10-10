import * as CartAction from '../actions/index'

const DEFAULT = {base: 0, enhanced: 0, power: 0}

export default function(state = DEFAULT, action) {
  switch (action.type) {
    case CartAction.ADD_BASE_CUBE:
      return {
        ...state,
	  base: state.base + 1,  
      }
    case CartAction.ADD_ENHANCED_CUBE:
      return {
        ...state,
	  enhanced: state.enhanced + 1,  
      }
    case CartAction.ADD_POWER_CUBE:
      return {
        ...state,
	  power: state.power + 1,  
      }
    case CartAction.DELETE_BASE_CUBE:
      return {
        ...state,
	  base: 0,  
      }
    case CartAction.DELETE_ENHANCED_CUBE:
      return {
        ...state,
	  enhanced: 0,  
      }
    case CartAction.DELETE_POWER_CUBE:
      return {
        ...state,
	  power: 0,  
      }
    case CartAction.CREATE_CART:
      return {
        ...state,
	  base: 0,
	  enhanced: 0,
	  power: 0
     }
     case CartAction.SEND_PRE_ORDER:
     	return {
     		...state,
     		address1: action.payload.address1,
     		address2: action.payload.address2,
     		zipcode: action.payload.zipcode,
     		name: action.payload.name,
     		email: action.payload.email,
     		password: action.payload.password
     	}
    default:
      return state
  }
}
