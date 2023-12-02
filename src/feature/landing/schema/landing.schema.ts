/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface tokenJwt {
    value: string;
    image: string;
    header: string;
    title: string;
}
  

@Schema({
  timestamps: true,
})
export class Landing {
  @Prop()
  header: string;

  @Prop()
  description: string;

  @Prop()
  position: string;

  @Prop()
  child: Array<tokenJwt>;

  @Prop()
  image: string;
}

export const LandingSchema = SchemaFactory.createForClass(Landing);
