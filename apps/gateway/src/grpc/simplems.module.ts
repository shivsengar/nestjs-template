import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { SimpleMSService } from "./simplems.service";
import { Module } from "@nestjs/common";
import { GrpcLoggingInterceptor } from "../config/grpc-logger.interceptop";
import { LoggerModule } from "shared/utility/logger/logger.module";

@Module({
    imports: [LoggerModule, ClientsModule.register([{
        name: 'simplems',
        transport: Transport.GRPC,
        options: {
            package: 'simplems',
            protoPath: join(__dirname, '../../apps/gateway/proto/simplems.proto'),
            url: '0.0.0.0:15332',
            loader: { keepCase: true, arrays: true, objects: true },

        },

    }])],
    providers: [GrpcLoggingInterceptor, SimpleMSService,],
    exports: [GrpcLoggingInterceptor, SimpleMSService, ClientsModule.register([{
        name: 'simplems',
        transport: Transport.GRPC,
        options: {
            package: 'simplems',
            protoPath: join(__dirname, '../../apps/gateway/proto/simplems.proto'),
            url: '0.0.0.0:15332',
            loader: { keepCase: true, arrays: true, objects: true },
        }
    }])],
})

export class SimpleMSRPCModule { }