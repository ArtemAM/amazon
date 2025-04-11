import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import {
  productSelectObject,
  productSelectObjectFullest
} from "./product.select"
import { ProductDto } from "./product.dto"
import { faker } from "@faker-js/faker"
import { EnumProductsSort, GetAllProductDto } from "./get-all.product.dto"
import { PaginationService } from "src/pagination/pagination.service"
import { Prisma } from "@prisma/client"

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService
  ) {}

  async getAll(dto: GetAllProductDto = {}) {
    const { sort, searchTerm } = dto
    const prismaSearch: Prisma.ProductOrderByWithRelationInput[] = []

    if (sort === EnumProductsSort.LOW_PRICE) {
      prismaSearch.push({ price: "asc" })
    } else if (sort === EnumProductsSort.HIGH_PRICE) {
      prismaSearch.push({ price: "desc" })
    } else if (sort === EnumProductsSort.NEWEST) {
      prismaSearch.push({ createdAt: "desc" })
    } else if (sort === EnumProductsSort.OLDEST) {
      prismaSearch.push({ createdAt: "asc" })
    }

    // не работает поле mode, поэтому используем toLowerCase()
    const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
      ? {
          OR: [
            {
              name: {
                contains: searchTerm.toLowerCase()
                // mode: "insensitive" // не работает
              }
            },
            {
              description: {
                contains: searchTerm.toLowerCase()
              }
            },
            {
              category: {
                is: {
                  name: {
                    contains: searchTerm.toLowerCase()
                  }
                }
              }
            }
          ]
        }
      : {}

    const { perPage, skip } = this.paginationService.getPagination(dto)

    const products = await this.prisma.product.findMany({
      where: prismaSearchTermFilter,
      orderBy: prismaSearch,
      select: productSelectObjectFullest,
      take: perPage,
      skip
    })

    const countProducts = await this.prisma.product.count({
      where: prismaSearchTermFilter
    })

    return { products, countProducts }
  }

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

  async delete(id: number) {
    return this.prisma.product.delete({
      where: { id }
    })
  }
}
