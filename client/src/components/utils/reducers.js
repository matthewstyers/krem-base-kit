import { FETCH_GALLERIES } from './actions';
const INITIAL_STATE = {
  galleries: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_GALLERIES:
      return {
        ...state,
        galleries: action.payload.data.galleries
      };
    default:
      return state;
  }
}
