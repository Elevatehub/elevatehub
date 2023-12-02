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

export class CreateHashtagBankDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ type: Array, description: 'fullName' })
  keyword: any;
}
