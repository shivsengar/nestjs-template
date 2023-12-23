import { Controller, Get } from '@nestjs/common';
import { MicroserviceTemplateService } from './microservice-template.service';
import { GrpcMethod } from '@nestjs/microservices';
import { AddRequest, AddResponse } from './dto/DtoTemplate';

@Controller()
export class MicroserviceTemplateController {
  constructor(private readonly microserviceTemplateService: MicroserviceTemplateService) {}

  @Get()
  getHello(): string {
    return this.microserviceTemplateService.getHello();
  }

  @GrpcMethod('SimpleMS','Add')
  add(req:AddRequest):AddResponse{
    const resp:AddResponse=new AddResponse();
    resp.result=(req.i+req.j);
    return resp;
  }
}
