import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import * as bodyParser from 'body-parser';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('v1');
  app.enableCors();

  // Support string bodies
  app.use(bodyParser.raw({ type: '*/*' }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(configService.get('PORT')));
})();
