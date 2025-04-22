import { instance } from '@/api/api.interceptor'
import { CATEGORY_ENDPOINTS } from '@/config/api'
import { ICategory } from '@/interfaces/category.interface'

export const CategoryService = {
  async getAll(): Promise<ICategory[]> {
    const response = await instance.get<ICategory[]>(CATEGORY_ENDPOINTS.GET_ALL)
    return response.data
  },

  async getById(categoryId: string): Promise<ICategory> {
    const response = await instance.get<ICategory>(
      CATEGORY_ENDPOINTS.GET_BY_ID.replace(':categoryId', categoryId)
    )
    return response.data
  }
}
