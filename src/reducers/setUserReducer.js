import { SET_WORKER } from '../actions/type'

export default (state = {}, action) => {
  switch (action.type) {
    case SET_WORKER:
      return {...state, worker: action.payload};
    default:
     return state;
  }
}