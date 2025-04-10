import { IsArray, IsNumber, IsOptional, IsString, IsUrl } from "class-validator"

export class ProductDto {
  @IsString()
  name: string

  @IsNumber()
  price?: number

  @IsOptional()
  @IsString()
  description: string

  @IsNumber()
  categoryId: number

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images: string[]
}
