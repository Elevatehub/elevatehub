import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  fullName: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'isActive' })
  isActive: boolean;
}
