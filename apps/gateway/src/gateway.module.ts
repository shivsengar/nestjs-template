import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { SimpleMSRPCModule } from './grpc/simplems.module';
import { SimpleMSService } from './grpc/simplems.service';
import { GrpcLoggingInterceptor } from './config/grpc-logger.interceptop';
import { LoggerModule } from 'shared/utility/logger/logger.module';

@Module({
  imports: [SimpleMSRPCModule,LoggerModule],
  controllers: [GatewayController],
  providers: [GrpcLoggingInterceptor,GatewayService,SimpleMSService],
  exports:[]
})
export class GatewayModule {}
