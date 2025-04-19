/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'

import { ConfigService } from '@nestjs/config';


import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //!Morgan
  app.use(morgan('dev'))

  //!Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Next Template')
    .setDescription('Documentación de la API')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);



  const configService = app.get(ConfigService); // configService.get('PORT')

  app.setGlobalPrefix('api/v1'); // Prefijo para todas las rutas de la API

  app.useGlobalPipes(new ValidationPipe({ // Validación de datos de entrada
    whitelist: true, // Elimina propiedades no definidas en el DTO
  }))

  await app.listen(configService.get('PORT') || 3000);
  console.log('PORT desde ConfigService:', configService.get('PORT'));

}
bootstrap();
