import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import {
  productSelectObject,
  productSelectObjectFullest
} from "./product.select"
import { ProductDto } from "./product.dto"
import { faker } from "@faker-js/faker"

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

  async getSimilar(productId: number) {
    const currentProduct = await this.getById(productId)

    if (!currentProduct) throw new NotFoundException("Product not found")

    const similarProducts = await this.prisma.product.findMany({
      where: {
        category: {
          name: currentProduct.category?.name
        },
        NOT: {
          id: currentProduct.id
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      select: productSelectObject
    })

    return similarProducts
  }

  async create() {
    const product = await this.prisma.product.create({
      data: {
        description: "",
        name: "",
        price: 0,
        slug: ""
      }
    })

    return product.id
  }

  async update(id: number, dto: ProductDto) {
    // Возможно здесь ошибка на images
    return await this.prisma.product.update({
      where: { id },
      data: {
        description: dto.description,
        price: dto.price,
        name: dto.name,
        slug: faker.helpers.slugify(dto.name).toLowerCase(),
        category: {
          connect: {
            id: dto.categoryId
          }
        },
        images: {
          create: dto.images?.map(image => ({
            imageUrl: image.imageUrl
          }))
        }
      }
    })
  }
}
