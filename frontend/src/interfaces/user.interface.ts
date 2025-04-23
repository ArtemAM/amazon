import { IProductImage } from './product.interface'
import { IStatisticItem } from './statistic.interface'

export interface IUser {
  id: number
  email: string
  name: string
  phone: string
  avatarPath: string | null
}

export type IUserStatistics = IStatisticItem[]

export interface IUserFavoriteProduct {
  id: number
  name: string
  price: number
  images: IProductImage[]
  slug: string
}

export interface IUserProfile extends IUser {
  favorites: IUserFavoriteProduct[]
}

export interface IUserUpdateProfile {
  email: string
  name?: string
  password?: string
  avatarPath?: string
  phone?: string
}
