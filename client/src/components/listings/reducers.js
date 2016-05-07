import { FETCH_LISTINGS } from './actions';
const INITIAL_STATE = {
  listings: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_LISTINGS:
      return {
        ...state,
        listings: action.payload.data.suites
      };
    default:
      return state;
  }
}
