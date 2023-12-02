import {
  IsArray,
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

export class CreateDataBankDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  type: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ type: Array, description: 'fullName' })
  keywords: any;
}
