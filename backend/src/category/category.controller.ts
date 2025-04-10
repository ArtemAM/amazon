import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UsePipes,
  ValidationPipe
} from "@nestjs/common"
import { CategoryService } from "./category.service"
import { CategoryDto } from "./category.dto"
import { Auth } from "src/auth/decorators/auth.decorator"

@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll()
  }

  @UsePipes(ValidationPipe)
  @Auth()
  @Put(":categoryId")
  async update(
    @Param("categoryId") categoryId: string,
    @Body() dto: CategoryDto
  ) {
    return this.categoryService.update(+categoryId, dto)
  }
}
