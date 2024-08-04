import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Story extends Document{

  @Prop()
  story_id: number;

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  created: number;

  @Prop()
  link: string;

  @Prop()
  visible: boolean;
}

export const StorySchema = SchemaFactory.createForClass(Story);