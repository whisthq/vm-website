import FormReducer from './form_reducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({
  FormReducer: FormReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_REDUX') {
    state = undefined
  }

  return reducers(state, action)
}

export default rootReducer
