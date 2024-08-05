import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StoriesModule } from './stories/stories.module';
import { AxiosService } from './axios/axios.service';
import { ExternalApiService } from './external-api/external-api.service';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    StoriesModule
  ],
  controllers: [AppController],
  providers: [AppService, AxiosService, ExternalApiService],
})
export class AppModule {}
