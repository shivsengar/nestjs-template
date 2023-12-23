import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { GrpcLoggingInterceptor } from './config/grpc-logger.interceptop';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useGlobalInterceptors(new GrpcLoggingInterceptor());
  await app.listen(3001);
}
bootstrap();
