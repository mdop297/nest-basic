/* eslint-disable @typescript-eslint/no-require-imports */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asasildfj'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //stripping off redundant data inside of a body of request automatically
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
