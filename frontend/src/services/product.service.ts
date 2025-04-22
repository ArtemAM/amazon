import { instance } from '@/api/api.interceptor'
import { PRODUCT_ENDPOINTS } from '@/config/api'
import { IProduct } from '@/interfaces/product.interface'

export const ProductService = {
  async getById(productId: string): Promise<IProduct> {
    const response = await instance.get<IProduct>(
      PRODUCT_ENDPOINTS.GET_BY_ID.replace(':productId', productId)
    )
    return response.data
  }
}
