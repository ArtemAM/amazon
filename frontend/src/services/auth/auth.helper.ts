import { STORAGE_KEYS } from '@/constants/storage'
import { IAuthResponse, ITokens } from '@/store/user.interface'
import Cookies from 'js-cookie'

export const saveTokensToStorage = (tokens: ITokens): void => {
  Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken)
  Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken)
}

export const removeTokensFromStorage = (): void => {
  Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN)
  Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN)
}

export const getAccessTokenFromStorage = (): string | undefined => {
  return Cookies.get(STORAGE_KEYS.ACCESS_TOKEN)
}

export const saveUserToStorage = (data: IAuthResponse): void => {
  saveTokensToStorage(data)
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user))
}

export const getUserFromStorage = (): IAuthResponse['user'] | null => {
  const user = localStorage.getItem(STORAGE_KEYS.USER)
  return user ? JSON.parse(user) : null
}
