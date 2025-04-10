import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { ReviewDto } from "./review.dto"

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.review.findMany({
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: true,
        rating: true,
        text: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            avatarPath: true
          }
        }
      }
    })
  }

  async create(userId: number, dto: ReviewDto, productId: number) {
    return await this.prisma.review.create({
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
