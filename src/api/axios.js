import axios from 'axios';

const BASE_URL = 'https://api.mandarin.weniv.co.kr';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
