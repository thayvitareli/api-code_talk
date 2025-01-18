import { Test, TestingModule } from '@nestjs/testing';
import { ForumQuestionsController } from './forum_questions.controller';
import { ForumQuestionsService } from './forum_questions.service';

describe('ForumQuestionsController', () => {
  let controller: ForumQuestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumQuestionsController],
      providers: [ForumQuestionsService],
    }).compile();

    controller = module.get<ForumQuestionsController>(ForumQuestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
