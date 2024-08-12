import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExternalApiService {
  constructor(private httpService: HttpService) {}

  async fetchStories(): Promise<any[]> {
    const url = 'https://hn.algolia.com/api/v1/search_by_date';
    let allHits = [];
    let page = 0;
    const hitsPerPage = 20; 
    let nbPages = 0; 

    try {
      do {
        const response = await lastValueFrom(this.httpService.get(url, {
          params: {
            query: 'nodejs',
            tags: 'story',
            page: page,
            hitsPerPage: hitsPerPage,
          },
        }));

        nbPages = response.data.nbPages;

        const hits = response.data.hits.filter(hit => (hit.story_url || hit.url) && (hit.story_title || hit.title));
        
        allHits = allHits.concat(hits.map(hit => ({
          story_id: hit.objectID,
          title: hit.story_title || hit.title,
          author: hit.author,
          link: hit.story_url || hit.url,
          created: hit.created_at_i,
          show: true,
        })));

        page++; 
      } while (page < nbPages); 

      return allHits;
    } catch (error) {
      console.error('Error fetching stories:', error);
      throw error;
    }
  }
}