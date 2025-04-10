import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { UserDto } from "./user.dto"
import { hash } from "argon2"
import { Prisma } from "@prisma/client"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: number, selectObj: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarPath: true,
        phone: true,
        password: false,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true
          }
        },
        ...selectObj
      }
    })

    if (!user) throw new NotFoundException("User not found")
    return user
  }

  async updateProfile(userId: number, dto: UserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { email: dto.email }
    })

    if (existUser && existUser.id !== userId) {
      throw new BadRequestException("User with this email already exists")
    }

    const data: UserDto = {
      email: dto.email,
      name: dto.name,
      phone: dto.phone,
      avatarPath: dto.avatarPath
    }

    if (dto.password) {
      data.password = await hash(dto.password)
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data
    })
  }

  async toggleFavorite(productId: number, userId: number) {
    const user = await this.getUserById(userId)

    const isExist = user.favorites.some(product => product.id === productId)

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          [isExist ? "disconnect" : "connect"]: {
            id: productId
          }
        }
      }
    })

    return { status: isExist ? "removed" : "added" }
  }
}
