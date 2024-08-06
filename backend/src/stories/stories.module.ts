import { Module } from '@nestjs/common';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Story, StorySchema } from './schemas/stories.schema';
import { HttpModule } from '@nestjs/axios';
import { ExternalApiService } from 'src/external-api/external-api.service';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: Story.name,
      schema: StorySchema,
    }]), HttpModule],
  controllers: [StoriesController],
  providers: [StoriesService, ExternalApiService],
  exports: [StoriesService],
})
export class StoriesModule {}
