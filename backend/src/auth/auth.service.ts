import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common"
import { PrismaService } from "src/prisma.service"
import { AuthDto } from "./dto/auth.dto"
import { verify } from "argon2"
import { JwtService } from "@nestjs/jwt"
import { User } from "@prisma/client"
import { refreshTokenDto } from "./dto/refresh-token.dto"
import { UserService } from "src/user/user.service"

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private userService: UserService
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.generateTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  async refreshToken(dto: refreshTokenDto) {
    try {
      const payload = this.jwt.verify<{ id: number }>(dto.refreshToken)
      const user = await this.userService.getUserById(payload.id)

      if (!user)
        throw new UnauthorizedException("Invalid or expired refresh token")

      const tokens = await this.generateTokens(user.id)

      return {
        user: this.returnUserFields(user),
        ...tokens
      }
    } catch {
      throw new UnauthorizedException("Invalid or expired refresh token")
    }
  }

  async register(dto: AuthDto) {
    const existUser = await this.userService.getUserByEmail(dto.email)
    if (existUser) {
      throw new BadRequestException("User with this email already exists")
    }
    const user = await this.userService.create(dto)

    const tokens = await this.generateTokens(user.id)

    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }

  private async generateTokens(userId: number) {
    const payload = { id: userId }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        expiresIn: "1h"
      }),
      this.jwt.signAsync(payload, {
        expiresIn: "7d"
      })
    ])

    return { accessToken, refreshToken }
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email
    }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getUserByEmail(dto.email)
    if (!user) throw new BadRequestException("Incorrect email or password")

    const isValidPassword = await verify(user.password, dto.password)
    if (!isValidPassword)
      throw new BadRequestException("Incorrect email or password")

    return user
  }
}
