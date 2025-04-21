import { IAuthResponse, ITokens } from '@/store/user.interface'
import Cookies from 'js-cookie'

const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'
const USER_KEY = 'user'

export const saveTokensToStorage = (tokens: ITokens): void => {
  Cookies.set(ACCESS_TOKEN_KEY, tokens.accessToken)
  Cookies.set(REFRESH_TOKEN_KEY, tokens.refreshToken)
}

export const removeTokensFromStorage = (): void => {
  Cookies.remove(ACCESS_TOKEN_KEY)
  Cookies.remove(REFRESH_TOKEN_KEY)
}

export const getAccessTokenFromStorage = (): string | undefined => {
  return Cookies.get(ACCESS_TOKEN_KEY)
}

export const saveUserToStorage = (data: IAuthResponse): void => {
  saveTokensToStorage(data)
  localStorage.setItem(USER_KEY, JSON.stringify(data.user))
}

export const getUserFromStorage = (): IAuthResponse['user'] | null => {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}
