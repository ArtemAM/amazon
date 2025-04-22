export interface IUser {
  id: number
  email: string
  name: string
  phone: string
  avatarPath: string | null
}

export interface IStatisticItem {
  name: 'Orders' | 'Reviews' | 'Favorites'
  value: number
}

export type IUserStatistics = IStatisticItem[]
