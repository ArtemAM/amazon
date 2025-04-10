import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { CategoryDto } from "./category.dto"
import { faker } from "@faker-js/faker"

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true
      }
    })
  }

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

  async getCategoryBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      select: {
        id: true,
        name: true,
        slug: true
      }
    })

    if (!category) throw new NotFoundException("Category not found")

    return category
  }

  async update(id: number, dto: CategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
        slug: faker.helpers.slugify(dto.name)
      }
    })
  }

  async delete(id: number) {
    return this.prisma.category.delete({
      where: { id }
    })
  }

  async create() {
    return await this.prisma.category.create({
      data: {
        name: "",
        slug: ""
      }
    })
  }
}
