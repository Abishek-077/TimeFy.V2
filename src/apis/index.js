import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Update this to your backend API

const apis = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apis;
