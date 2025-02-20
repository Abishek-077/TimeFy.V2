import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/v1';  // Update this to your backend API

const apis = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apis;
