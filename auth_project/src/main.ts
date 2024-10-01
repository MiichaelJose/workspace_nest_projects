import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './infrastructure/middleware/register.middleware';
import { NestExpressApplication } from "@nestjs/platform-express"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
  app.use(logger)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
