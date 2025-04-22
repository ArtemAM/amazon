import { saveUserToStorage } from './auth.helper'
import { getContentType } from '@/api/api.helper'
import { STORAGE_KEYS } from '@/constants/storage'
import { IAuthResponse } from '@/store/user.interface'
import axios from 'axios'

export const AuthService = {
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
