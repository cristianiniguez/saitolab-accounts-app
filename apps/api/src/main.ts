import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const validationPipe = new ValidationPipe({
  forbidNonWhitelisted: true,
  whitelist: true,
});

const documentBuilder = new DocumentBuilder()
  .setTitle('Saito Lab Accounts API')
  .addBasicAuth()
  .addBearerAuth()
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api-docs', app, document);

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
