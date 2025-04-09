import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException
} from "@nestjs/common"
import { User } from "@prisma/client"

interface RequestWithUser extends Request {
  user?: User
}

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>()
    const user = request.user

    if (!user) {
      throw new UnauthorizedException("User not found")
    }

    return data ? user[data] : user
  }
)
