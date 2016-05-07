import _ from 'lodash';

export const FILTER_LISTINGS = 'FILTER_LISTINGS';

export function filterListings(query) {
  return {
    type: FILTER_LISTINGS,
    payload: query
  };
}
