import { LISTEN_ADDED_DATA_TO_CHILD } from '../actions/type'

export default (state = {}, action) => {
  switch (action.type) {
    case LISTEN_ADDED_DATA_TO_CHILD:
      return action.payload;
    default:
      return state;
  }
}