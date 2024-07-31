import { Controller, Get } from '@nestjs/common';

@Controller('news')
export class NewsController {

    @Get()
    findAll(){
        return 'This returns all the news'
    }

    

}
