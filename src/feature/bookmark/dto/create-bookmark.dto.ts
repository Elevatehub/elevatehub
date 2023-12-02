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

export class CreateBookmarkDto {
    _id: mongoose.Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'fullName' })
    query: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'fullName' })
    header: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ type: Boolean, description: 'isActive' })
    isActive: boolean;
}
