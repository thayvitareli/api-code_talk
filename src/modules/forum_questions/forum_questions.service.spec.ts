import { Test, TestingModule } from '@nestjs/testing';
import { ForumQuestionsService } from './forum_questions.service';

describe('ForumQuestionsService', () => {
  let service: ForumQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForumQuestionsService],
    }).compile();

    service = module.get<ForumQuestionsService>(ForumQuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
