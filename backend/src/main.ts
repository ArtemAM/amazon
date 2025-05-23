import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix("api")
  app.enableCors()
  await app.listen(process.env.PORT ?? 4000)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
