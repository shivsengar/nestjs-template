import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('NestJs Swagger Docs')
  .setTitle('Nestjs Template APis')
  .setVersion('1.0')
  .build();