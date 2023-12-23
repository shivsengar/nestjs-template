import { NestMicroserviceOptions } from "@nestjs/common/interfaces/microservices/nest-microservice-options.interface";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const MicroservicesOptions=(optionVals?,):MicroserviceOptions&NestMicroserviceOptions=>({
    transport:Transport.GRPC,
    options:{
        package:'simplems',
        protoPath:join(__dirname,'../../apps/microservice-template/proto/simplems.proto'),
        url:optionVals.url,
        loader:{keepCase:true,arrays:true,objects:true}
    }
})