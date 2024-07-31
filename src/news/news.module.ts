import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema } from './entities/news.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
    {
      name: News.name,
      schema: NewsSchema,
    }])
  ],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
