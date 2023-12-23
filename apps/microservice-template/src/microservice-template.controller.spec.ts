import { Test, TestingModule } from '@nestjs/testing';
import { MicroserviceTemplateController } from './microservice-template.controller';
import { MicroserviceTemplateService } from './microservice-template.service';

describe('MicroserviceTemplateController', () => {
  let microserviceTemplateController: MicroserviceTemplateController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MicroserviceTemplateController],
      providers: [MicroserviceTemplateService],
    }).compile();

    microserviceTemplateController = app.get<MicroserviceTemplateController>(MicroserviceTemplateController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(microserviceTemplateController.getHello()).toBe('Hello World!');
    });
  });
});
