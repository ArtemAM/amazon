import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategoryById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        slug: true
      }
    })

    if (!category) throw new NotFoundException("Category not found")

    return category
  }
}
