import { Controller, Get } from "@nestjs/common"
import { UserService } from "./user.service"
import { CurrentUser } from "src/auth/decorators/user.decorator"
import { Auth } from "src/auth/decorators/auth.decorator"

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  @Auth()
  async getProfile(@CurrentUser("id") userId: number) {
    return this.userService.getUserById(userId)
  }
}
