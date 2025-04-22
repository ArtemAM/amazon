import { instance } from '@/api/api.interceptor'
import { STATISTICS_ENDPOINTS } from '@/config/api'
import { IUserStatistics } from '@/interfaces/user.interface'

export const StatisticService = {
  async getUserOverview(): Promise<IUserStatistics> {
    const response = await instance.get<IUserStatistics>(
      STATISTICS_ENDPOINTS.GET_USER_OVERVIEW
    )
    return response.data
  }
}
