import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OpenapiService } from './openapi.service';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/auth.guard';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('OpenAI')
@Controller('OpenAI')
export class OpenapiController {
  constructor(private readonly openapiService: OpenapiService) {}
  @Get('Find/:keyword')
  @UseGuards(AuthGuard)
  findAll(@Request() req, @Param('keyword') keyword: string) {
    return this.openapiService.find(keyword);
  }
}
