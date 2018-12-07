import { SET_USER_REALTIME_LOCATION } from '../actions/type'

export default (state = {}, action) => {
  switch(action.type) {
    case SET_USER_REALTIME_LOCATION:
      return action.payload;
    default:
      return state;
  }
}
