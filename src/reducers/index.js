import { combineReducers } from "redux"

/**
 * Reducers
 */
import auth from "./authReducer"
import data from './dataReducer'
import worker from './setUserReducer'
import realtimeUser from './rtUserLocationReducer'
import usersOnChange from './listenDataChildReducer'
import hoverId from './hoverMarkerReducer'
import path from './getPath'

export default combineReducers({
  auth,
  data,
  worker,
  realtimeUser,
  usersOnChange,
  hoverId,
  path
});
