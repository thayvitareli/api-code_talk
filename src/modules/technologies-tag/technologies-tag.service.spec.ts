import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesTagService } from './technologies-tag.service';

describe('TechnologiesTagService', () => {
  let service: TechnologiesTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnologiesTagService],
    }).compile();

    service = module.get<TechnologiesTagService>(TechnologiesTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
