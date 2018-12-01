import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import NavReducer from './NavReducer'
import ChatReducer from './ChatReducer'
import ContactReducer from './ContactReducer'

const AppReducer = combineReducers({
  nav: NavReducer,
  auth: AuthReducer,
  chat: ChatReducer,
  contact: ContactReducer
});

export default AppReducer