import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StoriesService } from 'src/stories/provider/stories.service';

@Injectable()
export class TasksService {
  constructor(private storiesService: StoriesService) {}

  @Cron(CronExpression.EVERY_HOUR)
  handleCron() {
    this.storiesService.fetchAndStoreStories();
  }
}