import { Test, TestingModule } from '@nestjs/testing';
import { StoriesService } from './stories.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { connect, Connection, Model } from 'mongoose';
import { Story, StorySchema } from '../schemas/stories.schema';
import { StoriesRepository } from '../repository/stories.repository';
import { getModelToken } from '@nestjs/mongoose';
import { TasksService } from 'src/tasks/tasks.service';
import { mockStoryCreate, mockStoryCreate2, mockStoryData } from 'src/__mocks__/story-service.mock';
import { ExternalApiService } from 'src/external-api/external-api.service';

describe('StoriesService', () => {
  let service: StoriesService;
  let repository: StoriesRepository;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let storyModel: Model<Story>;
  
  const externalApiService = {
    fetchStories: jest.fn().mockResolvedValue([
      mockStoryData,
    ]),
  };

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    storyModel = mongoConnection.model(Story.name, StorySchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoriesService,
        StoriesRepository,
        {provide: getModelToken(Story.name), useValue: storyModel},
        {provide: ExternalApiService, useValue: externalApiService},],
    }).compile();

    service = module.get<StoriesService>(StoriesService);
    repository = module.get<StoriesRepository>(StoriesRepository); 
  });

  afterAll( async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop(); 

  });

  afterEach( async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }); 

  describe('Fetch and Store Stories', () => {
    it('should fetch stories from and API and store them', async () => {
      repository.create = jest.fn().mockReturnValueOnce(mockStoryCreate);
      await service.fetchAndStoreStories();
      expect(externalApiService.fetchStories).toHaveBeenCalled();
      expect(repository.create).toHaveBeenCalled();
    })
  })

  describe('findAll', () => {
    it('should return all stories', async () => {
      repository.findAll = jest.fn().mockReturnValue([mockStoryCreate, mockStoryCreate2]);
      const stories = await service.findAll();
      expect(stories).toHaveLength(2);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });


});