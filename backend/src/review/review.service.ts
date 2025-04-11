import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { ReviewDto } from "./review.dto"
import { reviewSelectObject } from "./review.select"
import { ProductService } from "src/product/product.service"

@Injectable()
export class ReviewService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService
  ) {}

  async getAll() {
    return await this.prisma.review.findMany({
      orderBy: {
        createdAt: "desc"
      },
      select: reviewSelectObject
    })
  }

  async create(userId: number, dto: ReviewDto, productId: number) {
    const isExistProduct = await this.productService.getById(productId)

    if (!isExistProduct)
      throw new NotFoundException("User or product not found")
    return this.prisma.review.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId
          }
        },
        product: {
          connect: {
            id: productId
          }
        }
      }
    })
  }

  async getAverageRatingByProductId(productId: number) {
    const data = await this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true }
    })

    return data._avg
  }
}
