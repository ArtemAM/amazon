import { catchError, getContentType } from './api.helper'
import {
  getAccessTokenFromStorage,
  removeFromStorage
} from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'
import axios, { AxiosInstance } from 'axios'

export const instance: AxiosInstance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: getContentType()
})

instance.interceptors.request.use(config => {
  const accessToken = getAccessTokenFromStorage()
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

instance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true
      try {
        await AuthService.refreshToken()
        return instance.request(originalRequest)
      } catch (error) {
        if (catchError(error) === 'jwt expired') {
          removeFromStorage()
        }
      }
    }
  }
)
