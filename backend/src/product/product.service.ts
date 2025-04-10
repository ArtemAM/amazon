import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { productSelectObjectFullest } from "./product.select"

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: productSelectObjectFullest
    })

    if (!product) throw new NotFoundException("Product not found")

    return product
  }

  async getBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      select: productSelectObjectFullest
    })

    if (!product) throw new NotFoundException("Product not found")

    return product
  }

  async getByCategory(categorySlug: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          slug: categorySlug
        }
      },
      select: productSelectObjectFullest
    })

    if (!products) throw new NotFoundException("Product not found")

    return products
  }
}
