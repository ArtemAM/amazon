import { Prisma } from "@prisma/client"

export const categorySelectObject: Prisma.CategorySelect = {
  id: true,
  name: true,
  slug: true
}
