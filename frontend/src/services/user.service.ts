import { instance } from '@/api/api.interceptor'
import { USER_ENDPOINTS } from '@/config/api'
import { IUserProfile } from '@/interfaces/user.interface'

export const UserService = {
  async getProfile(): Promise<IUserProfile> {
    const response = await instance.get<IUserProfile>(
      USER_ENDPOINTS.GET_PROFILE
    )
    return response.data
  }
}
