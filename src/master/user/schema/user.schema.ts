/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  idRole: string;

  @Prop()
  isActive: boolean;

  @Prop()
  balance: number;

  @Prop()
  imagePhoto: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
