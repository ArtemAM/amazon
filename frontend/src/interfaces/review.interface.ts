export interface IReview {
  id: number
  rating: number
  text: string
  createdAt: Date
}

export interface IReviewWithUser extends IReview {
  user: IReviewUser
}

export interface IReviewLeaveResponse extends IReview {
  userId: number
  productId: number
}

export interface IReviewUser {
  id: number
  name: string
  avatarPath: string | null
}
