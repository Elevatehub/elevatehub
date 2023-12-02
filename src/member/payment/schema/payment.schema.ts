/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Payment {
  @Prop()
  _id: string;

  @Prop()
  merchantOrderId:string;
  
  @Prop()
  merchantCode: string;

  @Prop()
  reference: string;

  @Prop()
  paymentUrl: string;

  @Prop()
  vaNumber: string;

  @Prop()
  amount: string;

  @Prop()
  statusCode: string;

  @Prop()
  statusMessage: string;  

  @Prop()
  idSubscription: string;

  @Prop()
  idUser: string;

  @Prop()
  isActive: boolean;

  @Prop()
  isPending: boolean;

  @Prop()
  signature: string;
  @Prop()
  createdAt: Date;
  @Prop()
  endDate: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
