import axios from "axios";
import NProgress from 'nprogress';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(config => {
  NProgress.start();
  return config;
});

api.interceptors.response.use(response => {
  NProgress.done();
  return response;
}, error => {
  NProgress.done();
  return Promise.reject(error);
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, error => Promise.reject(error));

export default api;


