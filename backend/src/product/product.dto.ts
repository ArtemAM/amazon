import { IsArray, IsNumber, IsOptional, IsString } from "class-validator"

export class ProductDto {
  @IsString()
  name: string

  @IsNumber()
  price: number

  @IsOptional()
  @IsString()
  description?: string

  @IsNumber()
  categoryId: number

  @IsOptional()
  @IsArray()
  images?: { imageUrl: string }[]
}
