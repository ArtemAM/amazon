import { Prisma } from "@prisma/client"
import { categorySelectObject } from "src/category/category.select"
import { reviewSelectObject } from "src/review/review.select"

export const productSelectObject: Prisma.ProductSelect = {
  images: true,
  description: true,
  id: true,
  name: true,
  price: true,
  createdAt: true,
  slug: true
}

export const productSelectObjectFullest: Prisma.ProductSelect = {
  ...productSelectObject,
  reviews: {
    select: reviewSelectObject
  },
  category: {
    select: categorySelectObject
  }
}
