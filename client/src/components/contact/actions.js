import _ from 'lodash';
import axios from 'axios';

const ROOT_URL = `http://${process.env.HOST}`;
const API_ROOT = 'api/v1';

export const POST_INQUIRY = 'POST_INQUIRY';

export function createInquiry(props) {
  const url = `${ROOT_URL}/${API_ROOT}/inquiries`;

  const request = axios.post(url, props);
  return {
    type: POST_INQUIRY,
    payload: request
  };
}
