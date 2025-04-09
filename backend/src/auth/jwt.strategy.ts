import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { ConfigService } from "@nestjs/config"
import { PrismaService } from "src/prisma.service"
import { User } from "@prisma/client"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>("JWT_SECRET")!
    })
  }

  async validate({ id }: Pick<User, "id">) {
    const user = await this.prisma.user.findUnique({
      where: { id: +id }
    })

    if (!user) {
      throw new UnauthorizedException("User not found or unauthorized")
    }

    return user
  }
}
