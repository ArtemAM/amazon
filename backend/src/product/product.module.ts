import { Module } from "@nestjs/common"
import { ProductService } from "./product.service"
import { ProductController } from "./product.controller"
import { PrismaService } from "src/prisma.service"
import { PaginationService } from "src/pagination/pagination.service"
import { CategoryService } from "src/category/category.service"

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    PrismaService,
    PaginationService,
    CategoryService
  ],
  exports: [ProductService]
})
export class ProductModule {}
