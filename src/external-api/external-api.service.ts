import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExternalApiService {
  constructor(private httpService: HttpService) {}

  async fetchStories(): Promise<any[]> {
    const url = 'https://hn.algolia.com/api/v1/search_by_date';
    try {
      const response = await lastValueFrom(this.httpService.get(url, {
        params: {
          query: 'nodejs',
          tags: 'story',
        },
      }));
      return response.data.hits.map(hit => ({
        story_id: hit.objectID,
        title: hit.title,
        author: hit.author,
        link: hit.url,
        created_at: hit.created_at_i,
      }));
    } catch (error) {
      console.error('Error fetching stories:', error);
      throw error;
    }
  }
}