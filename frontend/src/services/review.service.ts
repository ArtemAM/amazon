import { instance } from '@/api/api.interceptor'
import { REVIEW_ENDPOINTS } from '@/config/api'
import { IReviewWithUser } from '@/interfaces/review.interface'

export const ReviewService = {
  async getAll(): Promise<IReviewWithUser[]> {
    const response = await instance.get<IReviewWithUser[]>(
      REVIEW_ENDPOINTS.GET_ALL
    )
    return response.data
  }
}
