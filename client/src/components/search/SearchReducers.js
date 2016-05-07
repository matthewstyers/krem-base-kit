import _ from 'lodash';
import { FILTER_LISTINGS } from './SearchActions';
const INITIAL_STATE = {
  listingsFilter: undefined,
  updateFormFields: undefined
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FILTER_LISTINGS:
      return {
        ...state,
        listingsFilter: _.transform(action.payload, (result, value, key) => {
          if (key === 'isAvailable') {
            result[key] = value === 'Available Now' ? true : false;
          } else {
            result[key] = {
              name: value
            };
          }
        }),
        updateFormFields: action.payload
      };
    default:
      return state;
  }
}
