import { Injectable, NotFoundException } from '@nestjs/common';
import { Story } from './entities/stories.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Injectable()
export class StoriesService {
    constructor(
        @InjectModel(Story.name) private readonly storyModel: Model<Story>,

    ) {}

    findAll() {
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

    async remove(id: string) {
        const story = await this.findOne(id);
        return story.deleteOne();
    }
}
