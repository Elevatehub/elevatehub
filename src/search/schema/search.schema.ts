/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Search {
  @Prop()
  _id: string;

  @Prop()
  title: string;

  @Prop()
  url: string;

  @Prop()
  views: string;

  @Prop()
  author: string;

  @Prop()
  avatar: string;

  @Prop()
  desc: string;

  @Prop()
  type: string;

  @Prop()
  keywords: string;

  @Prop()
  sentiment: string;

  @Prop()
  createdAt: Date;
}

export const SearchSchema = SchemaFactory.createForClass(Search);
