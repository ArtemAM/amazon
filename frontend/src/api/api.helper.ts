import { isAxiosError } from 'axios'

export const getContentType = () => ({
  'Content-Type': 'application/json'
})

export const catchError = (error: unknown): string => {
  if (isAxiosError(error)) {
    const msg = error.response?.data?.message
    if (Array.isArray(msg)) {
      return msg[0]
    }
    return msg || error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}
