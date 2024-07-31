import { Body, Controller, Delete, Get, Param, Patch, Post, Query, } from '@nestjs/common';

@Controller('news')
export class NewsController {

    @Get()
    findAll(@Query() paginationQuery){
        const { limit, offset } = paginationQuery;
        return `This action returns all news. Limit ${limit}, offset: ${offset}`;
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return `This action returns #${id} news`;
    }

    @Post()
    create(@Body() body) {
      return body;
      // return `This action creates a news`;
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return `This action updates #${id} news`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes #${id} news`;
    }


}
