import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './application.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './infrastructure/middleware/register.middleware';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(logger)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();
