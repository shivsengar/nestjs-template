import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { mockResponses } from './mock/mock';
import { ApiOperation } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

@ApiOperation({
  summary:'Fetch Site Information',
  description:"API to fetch site information."
})
  @Get()
  getSiteInfo(){
    return mockResponses.siteInfo;
  }
}
