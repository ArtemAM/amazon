import { ICategory } from './category.interface'
import { IReviewWithUser } from './review.interface'

export interface IProductImage {
  id: number
  imageUrl: string
  productId: number
}

export interface IProduct {
  description: string
  id: number
  name: string
  price: number
  createdAt: Date
  slug: string
  images: IProductImage[]
  reviews: IReviewWithUser[]
  category: ICategory
}
