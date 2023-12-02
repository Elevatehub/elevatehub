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

export class CreateLandingDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'header' })
    header: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'description' })
    description: string;
}
