import { Injectable, NotFoundException } from '@nestjs/common';
import { Story } from './schemas/stories.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { ExternalApiService } from 'src/external-api/external-api.service';

@Injectable()
export class StoriesService {
    constructor(
        @InjectModel(Story.name) private readonly storyModel: Model<Story>,
        private externalApiService : ExternalApiService,
    ) {}

    async fetchAndStoreStories(): Promise<void> {
        const stories = await this.externalApiService.fetchStories();
    
        for (const story of stories) {
          const exists = await this.storyModel.findOne({ story_id: story.story_id }).exec();
          
          if(exists) {
            const isDifferent = ['title', 'author', 'created', 'url'].some(field => exists[field] !== story[field]);
          
            if (isDifferent) {
                await this.storyModel.updateOne({ story_id: story.story_id }, { $set: {
                title: story.title,
                author: story.author,
                created: story.created,
                url: story.url
                }}).exec();
            }

        } else {
          await this.storyModel.create(story);
        }
        }
    }

    findAll(): Promise<Story[]> {
        return this.storyModel.find().exec()
    }
    
    async findOne(id: string) {
        const story = await this.storyModel.findOne({ _id: id}).exec();
        if(!story) {
            throw new NotFoundException(`News #${id} not found`);
        }
        return story;        
    }

    create(createStoryDto: CreateStoryDto) {
        const story = new this.storyModel(createStoryDto);
        return story.save();
    }

    async update(id: string, updateStoryDto: UpdateStoryDto) {
        const existingStory = await this.storyModel.findOneAndUpdate(
            { _id: id }, { $set: updateStoryDto }, {new: true }).exec();
        if (!existingStory) {
            throw new NotFoundException(`News #${id} not found`);
        }
        return existingStory;
    }

    async remove(id: string): Promise<any> {
        const result = await this.storyModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
          throw new NotFoundException(`News with ID ${id} not found.`);
        }
        return result;
      }
}
