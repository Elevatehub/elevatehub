import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  _id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'fullName' })
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'gambar' })
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'balance' })
  balance: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'keywords' })
  keywords: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'threads' })
  threads: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'keterangan' })
  keterangan: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'isActive' })
  isActive: boolean;
}
