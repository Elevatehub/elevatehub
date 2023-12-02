/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Subscription {
  @Prop()
  fullName: string;

  @Prop()
  balance: number;

  @Prop()
  threads: number;

  @Prop()
  keywords: number;

  @Prop()
  image: string;

  @Prop()
  keterangan: string;

  @Prop()
  isActive: boolean;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
