import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { ProductService } from "./product.service"
import { GetAllProductDto } from "./get-all.product.dto"
import { Auth } from "src/auth/decorators/auth.decorator"

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UsePipes(ValidationPipe)
  @Get()
  async getAll(@Query() queryDto: GetAllProductDto) {
    return this.productService.getAll(queryDto)
  }

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

  @UsePipes(ValidationPipe)
  @Auth()
  @Post()
  async createProduct() {
    return this.productService.create()
  }
}
