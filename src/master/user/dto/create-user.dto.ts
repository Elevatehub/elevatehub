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

export class CreateUserDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ type: String, description: 'password must 6 character' })
  password: string;

  @IsString()
  @ApiProperty({ type: String, description: 'wajib' })
  idRole: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'if null please input ""' })
  isActive: boolean;

  @IsNumber()
  @ApiProperty({ type: Number, description: 'if null please input ""' })
  balance: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description:
      'Please input default image => https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  })
  imagePhoto: string;
}
