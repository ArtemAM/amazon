import { IsEnum, IsOptional, IsString } from "class-validator"
import { PaginationDto } from "src/pagination/pagination.dto"

export enum EnumProductsSort {
  HIGH_PRICE = "high-price",
  LOW_PRICE = "low-price",
  NEWEST = "newest",
  OLDEST = "oldest"
}

export class GetAllProductDto extends PaginationDto {
  @IsOptional()
  @IsEnum(EnumProductsSort)
  sort?: EnumProductsSort

  @IsOptional()
  @IsString()
  searchTerm?: string
}
