import axios from 'axios'
import router from '@/router'
import TokenService from '../helper';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL

const service = axios.create( {
  withCredentials: true,
  baseURL: BASE_URL,
  timeout: 50000
})

service.interceptors.request.use (
  (config) => {
    const token = TokenService.getToken();
    if (token) {
      config.headers.Authorization = token
    } else {
      router.push({name: 'login'})
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use (
  (response) => {
    return {
      success: true,
      data: response?.data?.data
    }
  },
  (error) => {
    if (error?.response?.status) {
      switch (error.response.status) {
        case 401:
          TokenService.removeToken();
          router.push({name: 'login'})
          break
        case 403:
          router.push({ name: '500' });
          break;
        case 404:
          router.push({ name: '404' });
          break;
        case 500:
          router.push({ name: '500' });
          break;
        case 503:
          router.push({ name: '500' });
          break;
        default:
          router.push({ name: '500' });
      }
    }
    return Promise.reject(error);
  }
)

export default service;