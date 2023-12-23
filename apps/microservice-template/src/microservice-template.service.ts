import { Injectable } from '@nestjs/common';

@Injectable()
export class MicroserviceTemplateService {
  getHello(): string {
    return 'Hello World!';
  }
}
