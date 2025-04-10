import { Injectable } from "@nestjs/common"
import { UserService } from "src/user/user.service"

@Injectable()
export class StatisticsService {
  constructor(private userService: UserService) {}

  async getUserOverview(userId: number) {
    const user = await this.userService.getUserById(userId, {
      orders: {
        select: {
          items: true
        }
      },
      reviews: true
    })

    return [
      {
        name: "Orders",
        value: user.orders.length
      },
      {
        name: "Reviews",
        value: user.reviews.length
      },
      {
        name: "Favorites",
        value: user.favorites.length
      }
    ]
  }
}
