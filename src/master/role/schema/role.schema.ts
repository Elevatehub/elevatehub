/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Role {
  @Prop()
  fullName: string;

  @Prop()
  isActive: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
