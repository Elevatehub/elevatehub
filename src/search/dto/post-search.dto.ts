import { IsArray, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class PostSearchDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ type: Array, description: 'fullName' })
  keyword: any;
}
