import { combineReducers } from "redux"

import auth from "./authReducer"
import data from './dataReducer'
import worker from './setUserReducer'

export default combineReducers({
  auth,
  data,
  worker
});