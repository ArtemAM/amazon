import { ICategory } from './category.interface'
import { IPagination } from './pagination.interface'
import { IReviewWithUser } from './review.interface'

export interface IProductBase {
  description: string
  id: number
  name: string
  price: number
  createdAt: Date
  slug: string
}

export interface IProductImage {
  id: number
  imageUrl: string
  productId: number
}

export interface IProduct extends IProductBase {
  images: IProductImage[]
  reviews: IReviewWithUser[]
  category: ICategory
}

export interface IProductDTO {
  name: string
  price: number
  description?: string
  categoryId: number
  images?: { imageUrl: string }[]
}

export enum EnumProductsSort {
  HIGH_PRICE = 'high-price',
  LOW_PRICE = 'low-price',
  NEWEST = 'newest',
  OLDEST = 'oldest'
}

export interface IGetAllProductsQuery extends IPagination {
  sort?: EnumProductsSort
  searchTerm?: string
}

export interface IProductsResponse {
  products: IProduct[]
  countProducts: number
}
