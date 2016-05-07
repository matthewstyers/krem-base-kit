import axios from 'axios';
const hostname = process.env.HOST;

const ROOT_URL = `http://${hostname}`;
const API_ROOT = 'api/v1';

export const FETCH_GALLERIES = 'FETCH_GALLERIES';

export function fetchGalleries() {
  const url = `${ROOT_URL}/${API_ROOT}/galleries`;
  const request = axios.get(url);
  return {
    type: FETCH_GALLERIES,
    payload: request
  };
}
