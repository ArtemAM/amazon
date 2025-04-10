import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { UserDto } from "./user.dto"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: number) {
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
        }
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

    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        avatarPath: dto.avatarPath
      }
    })
  }
}
