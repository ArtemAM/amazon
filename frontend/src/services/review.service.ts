import { instance } from '@/api/api.interceptor'
import { REVIEW_ENDPOINTS } from '@/config/api'
import {
  IReviewData,
  IReviewLeaveResponse,
  IReviewWithUser
} from '@/interfaces/review.interface'

export const ReviewService = {
  async getAll(): Promise<IReviewWithUser[]> {
    const response = await instance.get<IReviewWithUser[]>(
      REVIEW_ENDPOINTS.GET_ALL
    )
    return response.data
  },

  async leaveByProductId(
    productId: string,
    data: IReviewData
  ): Promise<IReviewLeaveResponse> {
    const response = await instance.post(
      REVIEW_ENDPOINTS.LEAVE.replace(':productId', productId),
      data
    )
    return response.data
  }
}
