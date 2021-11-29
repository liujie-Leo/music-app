import { combineReducers } from 'redux'
import userReducer from './userInfo/reducer'
import playerReducer from './player/reducer'

const appReducer = combineReducers({
  userReducer,
  playerReducer
});

export default appReducer