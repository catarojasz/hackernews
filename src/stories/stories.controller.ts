import { Body, Controller, Delete, Get, Param, Patch, Post, Query, } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { ExternalApiService } from 'src/external-api/external-api.service';
import { Story } from './schemas/stories.schema';

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


    @Get()
    findAll(@Query() paginationQuery): Promise<Story[]> {
        const { limit, offset } = paginationQuery;
        return this.storiesService.findAll();;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return `This action returns #${id} story`;
    }

    @Post()
    create(@Body() body) {
      return body;
      // return `This action creates a story`;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return `This action updates #${id} story`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes #${id} story`;
    }


}
