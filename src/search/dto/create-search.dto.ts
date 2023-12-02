import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSearchDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  url: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  views: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  author: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  desc: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  type: string;
}
