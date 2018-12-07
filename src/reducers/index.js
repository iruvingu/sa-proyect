import { combineReducers } from "redux"

/**
 * Reducers
 */
import auth from "./authReducer"
import data from './dataReducer'
import worker from './setUserReducer'
import realtimeUser from './rtUserLocationReducer'
import usersOnChange from './listenDataChildReducer'
import dataSettedOnFB from './setRealTimeData'

export default combineReducers({
  auth,
  data,
  worker,
  realtimeUser,
  usersOnChange,
  dataSettedOnFB
});
