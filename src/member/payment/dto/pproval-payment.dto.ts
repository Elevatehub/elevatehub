import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ApprovalPaymentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'merchantOrderId' })
  merchantOrderId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'signature' })
  signature: string;
}
