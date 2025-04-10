import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"

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
}
