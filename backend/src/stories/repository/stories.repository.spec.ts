import { Test, TestingModule } from '@nestjs/testing';
import { StoriesRepository } from './stories.repository';

describe('StoriesRepository', () => {
  let provider: StoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoriesRepository],
    }).compile();

    provider = module.get<StoriesRepository>(StoriesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
