import { NestFactory } from '@nestjs/core';
import { MicroserviceTemplateModule } from './microservice-template.module';
import { MicroservicesOptions } from './config/microservice.config';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>
  (MicroserviceTemplateModule, MicroservicesOptions({ url: '0.0.0.0:15332' }));
  await app.listen();
  console.log("Microservice Started at 15332 port!");
}
bootstrap();
