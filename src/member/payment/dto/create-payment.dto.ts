import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'idSubscription' })
  idSubscription: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'idUser' })
  paymentMethod: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'idUser' })
  phoneNumber: string;
  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({ type: String, description: 'idUser' })
  // idUser: string;

  // @IsNotEmpty()
  // @IsBoolean()
  // @ApiProperty({ type: Boolean, description: 'isActive' })
  // isActive: boolean;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({ type: String, description: 'idUser' })
  // paymentAmount: string;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({ type: String, description: 'idUser' })
  // nameItem: string;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({ type: String, description: 'idUser' })
  // customerVaName: string;

  // @IsNotEmpty()
  // @IsString()
  // @ApiProperty({ type: String, description: 'idUser' })
  // email: string;
}
