export interface IReview {
  id: number
  rating: number
  text: string
  createdAt: Date
  user: IReviewUser
}

export interface IReviewUser {
  id: number
  name: string
  avatarPath: string | null
}
