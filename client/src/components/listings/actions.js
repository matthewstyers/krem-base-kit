import axios from 'axios';
const hostname = process.env.HOST;

const ROOT_URL = `http://${hostname}`;
const API_ROOT = 'api/v1';

export const FETCH_LISTINGS = 'FETCH_LISTINGS';

export function fetchListings() {
  const url = `${ROOT_URL}/${API_ROOT}/suites`;
  const request = axios.get(url);
  return {
    type: FETCH_LISTINGS,
    payload: request
  };
}
