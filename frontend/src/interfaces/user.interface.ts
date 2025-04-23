import { IStatisticItem } from './statistic.interface'

export interface IUser {
  id: number
  email: string
  name: string
  phone: string
  avatarPath: string | null
}

export type IUserStatistics = IStatisticItem[]
