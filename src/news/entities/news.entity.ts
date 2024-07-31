import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class News extends Document{
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  created: string;

  @Prop()
  link: string;

  @Prop()
  visible: boolean;
}

export const NewsSchema = SchemaFactory.createForClass(News);