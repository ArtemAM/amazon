import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { ConfigModule } from "@nestjs/config"
import { UserModule } from "./user/user.module"
import { CategoryModule } from "./category/category.module"
import { ReviewModule } from "./review/review.module"
import { StatisticsModule } from "./statistics/statistics.module"
import { PaginationModule } from "./pagination/pagination.module"

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    CategoryModule,
    ReviewModule,
    StatisticsModule,
    PaginationModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
