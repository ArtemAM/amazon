import { Prisma } from "@prisma/client"

export const reviewSelectObject: Prisma.ReviewSelect = {
  id: true,
  rating: true,
  text: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      name: true,
      avatarPath: true
    }
  }
}
