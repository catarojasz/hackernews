import { Test, TestingModule } from '@nestjs/testing';
import { StoriesController } from './stories.controller';
import { StoriesService } from '../service/stories.service';
import { ExternalApiService } from 'src/external-api/external-api.service';

describe('StoriesController', () => {
  let controller: StoriesController;

  beforeEach(async () => {

    const mockExternalApiService = {};
    const mockStoriesService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoriesController],

      providers: [
        {
          provide: StoriesService,
          useValue: mockStoriesService, 
        },
        {
          provide: ExternalApiService,
          useValue: mockExternalApiService, 
        },
      ],
    }).compile();

    controller = module.get<StoriesController>(StoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});