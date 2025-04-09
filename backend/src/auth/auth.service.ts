import { BadRequestException, Injectable } from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { AuthDto } from "./auth.dto"
import { faker } from "@faker-js/faker"
import { hash } from "argon2"
import { JwtService } from "@nestjs/jwt"
import { User } from "@prisma/client"

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}
  async register(dto: AuthDto) {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })
    if (existUser) {
      throw new BadRequestException("User with this email already exists")
    }
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.name.fullName(),
        phone: faker.phone.number({ style: "national" }),
        avatarPath: faker.image.avatar(),
        password: await hash(dto.password)
      }
    })

    const tokens = this.generateTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  private generateTokens(userId: number) {
    const payload = { id: userId }
    const accessToken = this.jwt.sign(payload, {
      expiresIn: "1h"
    })
    const refreshToken = this.jwt.sign(payload, {
      expiresIn: "7d"
    })

    return { accessToken, refreshToken }
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email
    }
  }
}
