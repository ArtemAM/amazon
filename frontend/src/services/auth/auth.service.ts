import { saveUserToStorage } from './auth.helper'
import { catchError, getContentType } from '@/api/api.helper'
import { instance } from '@/api/api.interceptor'
import { STORAGE_KEYS } from '@/constants/storage'
import { IAuthResponse, IEmailPassword } from '@/store/user.interface'
import axios from 'axios'

export const AuthService = {
  async authRequest(
    type: 'login' | 'register',
    data: IEmailPassword
  ): Promise<IAuthResponse> {
    try {
      const response = await instance.post<IAuthResponse>(`/auth/${type}`, data)

      if (response.data.accessToken) {
        saveUserToStorage(response.data)
      }

      return response.data
    } catch (error) {
      const message = catchError(error)
      throw new Error(message)
    }
  },

  async refreshToken(): Promise<IAuthResponse | null> {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
    if (!refreshToken) {
      console.warn('Refresh token отсутствует в localStorage')
      return null
    }
    try {
      const response = await axios.post<
        { refreshToken: string },
        { data: IAuthResponse }
      >(
        `${process.env.SERVER_URL}/auth/login/refresh-token`,
        { refreshToken },
        { headers: getContentType() }
      )

      if (response.data.accessToken) saveUserToStorage(response.data)

      return response.data
    } catch (error) {
      console.warn('Ошибка при обновлении токена', error)
      return null
    }
  }
}
