/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Bookmark {
  @Prop()
  id: string;
  @Prop()
  query: string;

  @Prop()
  idUser: string;

  @Prop()
  header: string;

  @Prop({ type: Array }) // Decorate the groupDate field with the correct type
  DateType: any;

  @Prop({ type: Array }) // Decorate the groupDate field with the correct type
  DateSentiment: any

  @Prop({ type: Array }) // Decorate the groupDate field with the correct type
  Type: any

  @Prop({ type: Array }) // Decorate the groupDate field with the correct type
  Sentiment: any

  @Prop({ type: Array }) // Decorate the groupDate field with the correct type
  News: any

  @Prop({ type: Array }) // Decorate the groupDate field with the correct type
  GroupType: any

  @Prop({ type: Array }) // Decorate the groupDate field with the correct type
  GroupSentiment: any

  @Prop({ type: Array }) // Decorate the groupDate field with the correct type
  Hashtag: any

  @Prop({ type: Array }) // Decorate the groupDate field with the correct type
  GroupHashtag: any

  @Prop()
  isActive: boolean;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
