import { Module } from '@nestjs/common';
import { StoriesController } from './controller/stories.controller';
import { StoriesService } from './service/stories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Story, StorySchema } from './schemas/stories.schema';
import { HttpModule } from '@nestjs/axios';
import { ExternalApiService } from 'src/external-api/external-api.service';
import { StoriesRepository } from './repository/stories.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: Story.name,
      schema: StorySchema,
    }]), HttpModule],
  controllers: [StoriesController],
  providers: [StoriesService, ExternalApiService, StoriesRepository],
  exports: [StoriesService],
})
export class StoriesModule {}
