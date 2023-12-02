/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class BankData {
  @Prop()
  _id: string;
  title: string;
  url: string;
  views: string;
  author: string;
  desc: string;
  type: string;
  sentiment: string;
  createdAt: Date;
}

export const BankDataSchema = SchemaFactory.createForClass(BankData);
