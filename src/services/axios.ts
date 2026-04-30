import axios from 'axios';
import config from './axios-config';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

const axiosInstance = axios.create({
  baseURL: config.ApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
