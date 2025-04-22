import { instance } from '@/api/api.interceptor'
import { PRODUCT_ENDPOINTS } from '@/config/api'
import { IProduct, IProductBase } from '@/interfaces/product.interface'

export const ProductService = {
  async getById(productId: string): Promise<IProduct> {
    const response = await instance.get<IProduct>(
      PRODUCT_ENDPOINTS.GET_BY_ID.replace(':productId', productId)
    )
    return response.data
  },

  async getBySlug(slug: string): Promise<IProduct> {
    const response = await instance.get<IProduct>(
      PRODUCT_ENDPOINTS.GET_BY_SLUG.replace(':slug', slug)
    )
    return response.data
  },

  async getByCategory(categorySlug: string): Promise<IProduct[]> {
    const response = await instance.get<IProduct[]>(
      PRODUCT_ENDPOINTS.GET_BY_CATEGORY.replace(':categorySlug', categorySlug)
    )
    return response.data
  },

  async getSimilar(productId: string): Promise<IProduct[]> {
    const response = await instance.get<IProduct[]>(
      PRODUCT_ENDPOINTS.GET_SIMILAR.replace(':productId', productId)
    )
    return response.data
  },

  async create(): Promise<{ productId: number }> {
    const response = await instance.post<{ productId: number }>(
      PRODUCT_ENDPOINTS.CREATE
    )
    return response.data
  },

  async delete(productId: string): Promise<IProductBase> {
    const response = await instance.delete<IProductBase>(
      PRODUCT_ENDPOINTS.DELETE_BY_ID.replace(':productId', productId)
    )
    return response.data
  }
}
