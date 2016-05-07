import { POST_INQUIRY } from './actions';
const INITIAL_STATE = {
  inquiry: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case POST_INQUIRY:
      return {
        ...state,
        inquiry: action.payload.data
      };
    default:
      return state;
  }
}
