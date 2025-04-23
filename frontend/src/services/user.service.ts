import { instance } from '@/api/api.interceptor'
import { USER_ENDPOINTS } from '@/config/api'
import {
  IUser,
  IUserProfile,
  IUserUpdateProfile
} from '@/interfaces/user.interface'

export const UserService = {
  async getProfile(): Promise<IUserProfile> {
    const response = await instance.get<IUserProfile>(
      USER_ENDPOINTS.GET_PROFILE
    )
    return response.data
  },

  async updateProfile(data: IUserUpdateProfile): Promise<IUser> {
    const response = await instance.put(USER_ENDPOINTS.UPDATE_PROFILE, data)
    return response.data
  },

  async toggleFavorite(productId: string): Promise<{ status: string }> {
    const response = await instance.patch<{ status: string }>(
      USER_ENDPOINTS.TOGGLE_FAVORITE.replace(':productId', productId)
    )
    return response.data
  }
}
