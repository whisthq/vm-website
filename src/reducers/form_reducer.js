import * as FormAction from '../actions/index'

const DEFAULT = {}

export default function(state = DEFAULT, action) {
  switch (action.type) {
    case FormAction.SEND_FORM_DATA:
      return {
        ...state,
      }
    default:
      return state
  }
}
