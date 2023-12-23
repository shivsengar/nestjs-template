import { Body, Controller, Get, Post } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { AddRequest } from './dto/DtoTemplate';
import { SimpleMSService } from './grpc/simplems.service';

@Controller()
export class GatewayController {
  constructor(
    private readonly gatewayService: GatewayService,
    private readonly simpleMSService:SimpleMSService
    ) {}

  @Get()
  getHello(): string {
    return this.gatewayService.getHello();
  }

  @Post("/add")
  add(@Body() request:AddRequest){
    return this.simpleMSService.Add(request);
  }
}
