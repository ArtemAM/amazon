import { Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number) {
    return await this.prisma.order.findMany({
      where: { id: userId },
      orderBy: { createdAt: "desc" }
    })
  }
}
