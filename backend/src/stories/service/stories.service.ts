import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateStoryDto } from '../dto/create-story.dto';
import { UpdateStoryDto } from '../dto/update-story.dto';
import { ExternalApiService } from 'src/external-api/external-api.service';
import { StoriesRepository } from '../repository/stories.repository';

@Injectable()
export class StoriesService implements OnModuleInit {
    constructor(
        private storiesRepository: StoriesRepository,
        private externalApiService: ExternalApiService,
    ) {}

    async fetchAndStoreStories(): Promise<void> {
        const stories = await this.externalApiService.fetchStories();

        for (const story of stories) {
            const exists = await this.storiesRepository.findOneByStoryId(story.story_id);
            
            if (exists) {
                const isDifferent = ['title', 'link'].some(field => exists[field] !== story[field]);
                
                if (isDifferent) {
                    await this.storiesRepository.updateOne(story.story_id, {
                        title: story.title,
                        link: story.link,
                    });
                }
            } else {
                await this.storiesRepository.create(story);
            }
        }
    }

    findAll() {
        return this.storiesRepository.findAll();
    }
    
    async findOne(id: string) {
        const story = await this.storiesRepository.findOneById(id);
        if (!story) {
            throw new NotFoundException(`News #${id} not found`);
        }
        return story;        
    }

    create(createStoryDto: CreateStoryDto) {
        return this.storiesRepository.create(createStoryDto);
    }

    async update(id: string, updateStoryDto: UpdateStoryDto) {
        const existingStory = await this.storiesRepository.findOneById(id);
        if (!existingStory) {
            throw new NotFoundException(`News #${id} not found`);
        }
        
        await this.storiesRepository.updateOne(id, updateStoryDto);
        return this.storiesRepository.findOneById(id);
    }

    async remove(id: string): Promise<any> {
        const result = await this.storiesRepository.remove(id);
        if (result.deletedCount === 0) {
            throw new NotFoundException(`News with ID ${id} not found.`);
        }
        return result;
    }

    async onModuleInit(): Promise<any> {
        await this.externalApiService.fetchStories();
    }
}