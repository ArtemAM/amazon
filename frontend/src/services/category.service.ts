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
  },

  async getBySlug(slug: string): Promise<ICategory> {
    const response = await instance.get<ICategory>(
      CATEGORY_ENDPOINTS.GET_BY_SLUG.replace(':slug', slug)
    )
    return response.data
  },

  async create(): Promise<ICategory> {
    const response = await instance.post<ICategory>(CATEGORY_ENDPOINTS.CREATE)
    return response.data
  },

  async updateById(
    categoryId: string,
    categoryName: string
  ): Promise<ICategory> {
    const response = await instance.put<ICategory>(
      CATEGORY_ENDPOINTS.UPDATE_BY_ID.replace(':categoryId', categoryId),
      { name: categoryName }
    )
    return response.data
  },

  async deleteById(categoryId: string): Promise<ICategory> {
    const response = await instance.delete<ICategory>(
      CATEGORY_ENDPOINTS.DELETE_BY_ID.replace(':categoryId', categoryId)
    )
    return response.data
  }
}
