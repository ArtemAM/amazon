import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { UserService } from "./user.service"
import { CurrentUser } from "src/auth/decorators/user.decorator"
import { Auth } from "src/auth/decorators/auth.decorator"
import { UserDto } from "./user.dto"

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  @Auth()
  async getProfile(@CurrentUser("id") userId: number) {
    return this.userService.getUserById(userId)
  }

  @UsePipes(ValidationPipe)
  @Put("profile")
  @Auth()
  async updateProfile(@CurrentUser("id") userId: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(userId, dto)
  }

  @Auth()
  @Patch("profile/favorites/:productId")
  async toggleFavorite(
    @Param("productId") productId: string,
    @CurrentUser("id") userId: number
  ) {
    return this.userService.toggleFavorite(+productId, userId)
  }
}
