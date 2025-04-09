import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthDto } from "./dto/auth.dto"
import { refreshTokenDto } from "./dto/refreshToken.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post("register")
  async regsiter(@Body() dto: AuthDto) {
    return this.authService.register(dto)
  }

  @UsePipes(ValidationPipe)
  @Post("login")
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto)
  }

  @UsePipes(ValidationPipe)
  @Post("login/refresh-token")
  async refreshToken(@Body() dto: refreshTokenDto) {
    return this.authService.refreshToken(dto)
  }
}
