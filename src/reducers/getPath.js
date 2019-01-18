import { SET_PATH } from '../actions/type'

export default (state = {}, action) => {
  switch(action.type) {
    case SET_PATH:
      return {...state, path: action.payload};
    default:
      return state;
  }
}