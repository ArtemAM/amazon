import { getContentType } from './api.helper'
import { getAccessTokenFromStorage } from '@/services/auth/auth.helper'
import axios from 'axios'

const instance = axios.create({
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
