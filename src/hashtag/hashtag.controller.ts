import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/auth.guard';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Hashtag')
@Controller('Hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createHashtagDto: CreateHashtagDto) {
    return this.hashtagService.create(createHashtagDto);
  }
}
