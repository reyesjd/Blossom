import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { LoggingMiddleware } from './libs';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(new LoggingMiddleware().use);
  await app.listen(3000);
}
bootstrap();
