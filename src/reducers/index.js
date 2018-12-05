import { combineReducers } from "redux"

/**
 * Reducers
 */
import auth from "./authReducer"
import data from './dataReducer'
import worker from './setUserReducer'
import realtimeUser from './rtUserLocationReducer'
import userLocation from './dataAddedToChildReducer'

export default combineReducers({
  auth,
  data,
  worker,
  realtimeUser,
  userLocation
});
