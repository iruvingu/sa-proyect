import { FETCH_FIREBASE_DB } from '../actions/type'

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_FIREBASE_DB:
      return action.payload;
    default:
      return state;
  }
}
