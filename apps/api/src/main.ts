import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { LoggingMiddleware } from './libs';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.use(new LoggingMiddleware().use);
  // add cors
  app.enableCors();
  await app.listen(process.env.APIPORT || 3000);
}
bootstrap();
