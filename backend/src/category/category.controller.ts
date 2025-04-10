import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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

  @Auth()
  @Get(":categoryId")
  async getById(@Param("categoryId") categoryId: string) {
    return this.categoryService.getCategoryById(+categoryId)
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

  @UsePipes(ValidationPipe)
  @Auth()
  @Post()
  async create() {
    return this.categoryService.create()
  }

  @Auth()
  @Post(":categoryId")
  async delete(@Param("categoryId") categoryId: string) {
    return this.categoryService.delete(+categoryId)
  }
}
