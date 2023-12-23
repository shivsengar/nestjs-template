import { Module } from '@nestjs/common';
import { MicroserviceTemplateController } from './microservice-template.controller';
import { MicroserviceTemplateService } from './microservice-template.service';

@Module({
  imports: [],
  controllers: [MicroserviceTemplateController],
  providers: [MicroserviceTemplateService],
})
export class MicroserviceTemplateModule {}
