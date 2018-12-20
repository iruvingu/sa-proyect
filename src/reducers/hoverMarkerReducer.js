import { SET_MARKER } from '../actions/type'

export default (state = {}, action) => {
  switch (action.type) {
    case SET_MARKER:
      return action.payload;
    default:
      return state;
  }
}