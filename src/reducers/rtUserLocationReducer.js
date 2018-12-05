import { FETCH_REALTIME_USER_DB } from '../actions/type'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_REALTIME_USER_DB:
      return action.payload;
    default:
      return state;
  }
}