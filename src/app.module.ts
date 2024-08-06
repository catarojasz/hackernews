import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StoriesModule } from './stories/stories.module';
import { ExternalApiService } from './external-api/external-api.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';
import { HttpService } from '@nestjs/axios';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    StoriesModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
