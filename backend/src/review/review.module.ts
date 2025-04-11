import { Module } from "@nestjs/common"
import { ReviewService } from "./review.service"
import { ReviewController } from "./review.controller"
import { PrismaService } from "src/prisma.service"
import { ProductService } from "src/product/product.service"
import { PaginationService } from "src/pagination/pagination.service"
import { CategoryService } from "src/category/category.service"

@Module({
  controllers: [ReviewController],
  providers: [
    ReviewService,
    PrismaService,
    ProductService,
    PaginationService,
    CategoryService
  ]
})
export class ReviewModule {}
