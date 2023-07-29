import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('/api/stock-tracker/v1');
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(helmet());
  // app.enableCors();
  app.use(json({ limit: '50mb' }));

  const options = new DocumentBuilder()
    .setTitle('Stock Tracker')
    .setDescription(`Stock Tracker related API'S`)
    .setVersion('1.0')
    .addServer('http://127.0.0.1:5000')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
    }),
  );

  await app.listen(
    configService.get('PORT') ? configService.get('PORT') : 3000,
    '0.0.0.0',
  );

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
