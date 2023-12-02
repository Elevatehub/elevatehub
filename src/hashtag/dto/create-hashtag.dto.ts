import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHashtagDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  keyword: string;
}
