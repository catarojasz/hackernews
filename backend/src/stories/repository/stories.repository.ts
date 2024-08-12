import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Story } from '../schemas/stories.schema';

@Injectable()
export class StoriesRepository {
    constructor(@InjectModel(Story.name) private readonly storyModel: Model<Story>) {}

    async findOneById(storyId: string): Promise<Story | null> {
        return this.storyModel.findOne({ _id: storyId }).exec();
    }

    async findOneByStoryId(storyId: string): Promise<Story | null> {
        return this.storyModel.findOne({ story_id: storyId }).exec();
    }

    async create(story: any): Promise<Story> {
        return this.storyModel.create(story);
    }

    async updateOne(storyId: string, updateData: any): Promise<void> {
        await this.storyModel.updateOne({ story_id: storyId }, { $set: updateData }).exec();
    }

    async findAll(): Promise<Story[]> {
        return this.storyModel.find().exec();
    }

    async remove(id: string): Promise<any> {
        return this.storyModel.deleteOne({ _id: id }).exec();
    }
}