import { Module } from '@nestjs/common';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Story, StorySchema } from './entities/stories.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: Story.name,
      schema: StorySchema,
    }])
  ],
  controllers: [StoriesController],
  providers: [StoriesService]
})
export class StoriesModule {}
