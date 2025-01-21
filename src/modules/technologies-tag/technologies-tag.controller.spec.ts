import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesTagController } from './technologies-tag.controller';
import { TechnologiesTagService } from './technologies-tag.service';

describe('TechnologiesTagController', () => {
  let controller: TechnologiesTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnologiesTagController],
      providers: [TechnologiesTagService],
    }).compile();

    controller = module.get<TechnologiesTagController>(TechnologiesTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
