import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/auth.guard';
import { CreateDataBankDto } from './dto/create-data-bank.dto';
import { CreateHashtagBankDto } from './dto/hashtag-data-bank.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('BankData')
@Controller('BankData')
export class DataBankController {
  constructor(
    private readonly searchService: SearchService,
    private readonly hastagService: HashtagService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  get(@Body() createDataBankDto: CreateDataBankDto) {
    return this.searchService.findAll(createDataBankDto);
  }
  @Post('HashTag')
  @UseGuards(AuthGuard)
  gethashtag(@Body() createHashtagBankDto: CreateHashtagBankDto) {
    return this.hastagService.findAll(createHashtagBankDto);
  }
}
