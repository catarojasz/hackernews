import { Injectable } from '@nestjs/common';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
    private news: News[] = [];

    findAll() {
        return this.news;
      }
    
    findOne(id: string) {
    return this.news.find(item => item.id === +id);
    }

    create(createNewsDto: any) {
    this.news.push(createNewsDto);
    }

    update(id: string, updateNewsDto: any) {
    const existingNews = this.findOne(id);
    if (existingNews) {
        // update the existing entity
    }
    }

    remove(id: string) {
    const newsIndex = this.news.findIndex(item => item.id === +id);
    if (newsIndex >= 0) {
        this.news.splice(newsIndex, 1);
    }
    }
}
