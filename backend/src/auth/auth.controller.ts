import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthDto } from "./auth.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post("register")
  async regsiter(@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }
}
