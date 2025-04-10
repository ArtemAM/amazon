import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { ReviewService } from "./review.service"
import { Auth } from "src/auth/decorators/auth.decorator"
import { CurrentUser } from "src/auth/decorators/user.decorator"
import { ReviewDto } from "./review.dto"

@Controller("reviews")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAll() {
    return this.reviewService.getAll()
  }

  @UsePipes(ValidationPipe)
  @Auth()
  @Post("leave/:productId")
  async leaveReview(
    @CurrentUser("id") userId: number,
    @Body() dto: ReviewDto,
    @Param("productId") productId: string
  ) {
    return this.reviewService.create(userId, dto, +productId)
  }
}
