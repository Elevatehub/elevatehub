/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Hashtag {
  @Prop()
  title: string;

  @Prop()
  keyword: string;
}

export const HashtagSchema = SchemaFactory.createForClass(Hashtag);
