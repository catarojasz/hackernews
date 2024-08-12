import { Body, Controller, Delete, Get, Param, Patch, Post, Query, } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { ExternalApiService } from 'src/external-api/external-api.service';
import { Story } from './schemas/stories.schema';
import { UpdateStoryDto } from './dto/update-story.dto';

@Controller('Stories')
export class StoriesController {

  constructor(
    private readonly storiesService: StoriesService,
    private readonly externalApiService: ExternalApiService,
  ) {}

    @Get('stories')
    getStories() {
      return this.externalApiService.fetchStories();
    }

    @Patch(':id/noshow')
    async markAsNoShow(@Param('id') id: string) {
      return this.storiesService.update(id, { noShow: Date.now() });
    }


    @Get()
    findAll(): Promise<Story[]> {
        return this.storiesService.findAll();;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.storiesService.findOne(id);
    }

    @Post()
    create(@Body() body) {
      return body;
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
      return this.storiesService.update(id, updateStoryDto);
    }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.storiesService.remove(id);
    return { message: `News with ID ${id} successfully deleted.` };
  }


}
