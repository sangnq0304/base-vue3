import axios from 'axios'
import TokenService from '../helper'

const BASE_URL = (import.meta.env.VITE_APP_BASE_URL || '').replace(/\/$/, '')

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
})

service.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => ({
    success: true,
    data: response.data,
  }),
  (error) => {
    const status = error?.response?.status

    if (status) {
      import('@/router').then(({ default: router }) => {
        switch (status) {
          case 401:
            TokenService.removeToken()
            router.push({ name: 'login' })
            break
          case 404:
            router.push({ name: '404' })
            break
          case 403:
          case 500:
          case 503:
            router.push({ name: '500' })
            break
          default:
            router.push({ name: '500' })
        }
      })
    }

    return Promise.reject(error)
  }
)

export default service
