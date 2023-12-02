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

export class CreateLandingChildDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'header' })
    header: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'value' })
    value: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'icon' })
    icon: string;
}
