import { Controller, Get, Param } from "@nestjs/common"
import { ProductService } from "./product.service"

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get("similar/:id")
  async getSimilar(@Param("id") id: string) {
    return this.productService.getSimilar(+id)
  }

  @Get("by-slug/:slug")
  async getBySlug(@Param("slug") slug: string) {
    return this.productService.getBySlug(slug)
  }

  @Get("by-category/:categorySlug")
  async getByCategory(@Param("categorySlug") categorySlug: string) {
    return this.productService.getByCategory(categorySlug)
  }
}
