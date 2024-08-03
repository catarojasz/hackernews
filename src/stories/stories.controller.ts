import { Body, Controller, Delete, Get, Param, Patch, Post, Query, } from '@nestjs/common';

@Controller('Stories')
export class StoriesController {

    @Get()
    findAll(@Query() paginationQuery){
        const { limit, offset } = paginationQuery;
        return `This action returns all stories. Limit ${limit}, offset: ${offset}`;
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
