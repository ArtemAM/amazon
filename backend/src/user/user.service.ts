import { Injectable, NotFoundException } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"

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
}
