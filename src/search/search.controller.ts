/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/auth.guard';
import { tokenJwt, extractTokenFromHeader } from 'src/bcrypt';
import { PostSearchDto } from './dto/post-search.dto';
import { TopicService } from 'src/feature/topic/topic.service';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Search')
@Controller('Search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly topicService: TopicService,
  ) { }

  @Post('Google')
  @UseGuards(AuthGuard)
  async findGoogle(@Request() req, @Body() postDto: PostSearchDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findGoogle(postDto);
  }

  @Post('Tiktok')
  @UseGuards(AuthGuard)
  async findTiktok(@Request() req, @Body() postDto: PostSearchDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findTiktok(postDto);
  }

  @Post('Instagram')
  @UseGuards(AuthGuard)
  async findInstagram(@Request() req, @Body() postDto: PostSearchDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findInstagram(postDto);
  }

  @Post('Facebook')
  @UseGuards(AuthGuard)
  async findFacebook(@Request() req, @Body() postDto: PostSearchDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findFacebook(postDto);
  }
  @Post('Google-News')
  @UseGuards(AuthGuard)
  async findGoogleNews(@Request() req, @Body() postDto: PostSearchDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findGoogleNews(postDto.keyword[0]);
  }

  @Post('Google-Trends-Now')
  @UseGuards(AuthGuard)
  async findGoogleTrends(@Request() req) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findGoogleTrends();
  }
  @Post('Google-Trends-Number')
  @UseGuards(AuthGuard)
  async findGoogleTrendsSearchKeyword(
    @Request() req,
    @Body() postDto: PostSearchDto,
  ) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findGoogleTrendsSearchKeyword(postDto);
  }
  @Post('Google-Trends-Search')
  @UseGuards(AuthGuard)
  async findGoogleTrendsSearch(@Request() req, @Body() postDto: PostSearchDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findGoogleTrendsSearch(postDto);
  }

  @Post('Web-Competitor-Quick')
  @UseGuards(AuthGuard)
  async findWebCompetitorQuick(@Request() req, @Body() postDto: PostSearchDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findWebCompetitorQuick(postDto);
  }

  @Post('Web-Competitor-Full')
  @UseGuards(AuthGuard)
  async findWebCompetitorFull(@Request() req, @Body() postDto: PostSearchDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findWebCompetitorFull(postDto);
  }

  @Post('Bussiness-Extract-Information')
  @UseGuards(AuthGuard)
  async findBussinessExtract(@Request() req, @Body() postDto: PostSearchDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findBussinessExtract(postDto);
  }

  @Post('Technology-Lookup-Information')
  @UseGuards(AuthGuard)
  async findTechnologyLookup(@Request() req, @Body() postDto: PostSearchDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findTechnologyLookup(postDto);
  }

  @Post('SEO-Audit-Information')
  @UseGuards(AuthGuard)
  async findSEOAudit(@Request() req, @Body() postDto: PostSearchDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.searchService.findSEOAudit(postDto);
  }

  @Post('Sentiment')
  @UseGuards(AuthGuard)
  async findAll(@Request() req, @Body() postDto: PostSearchDto) {
    const result = await this.searchService.pushSentiment(postDto);
    return result;
  }

  @Post('StartEngine')
  @UseGuards(AuthGuard)
  async postAll(@Request() req, @Body() postDto: PostSearchDto) {
    await this.searchService.findTiktok(postDto);
    await this.searchService.findInstagram(postDto);
    await Promise.all(
      postDto.keyword.map(async (element) => {
        try {
          await this.searchService.findGoogleNews(element);
          return 'Done';
        } catch (error) {
          return 'Failure';
        }
      }),
    );
    await this.searchService.findFacebook(postDto);
    return 'Done';
  }

  @Post('StartEngine/CronJob/Instagram')
  async cronJobInstagram() {
    const name = await this.topicService.findAllKeyword();
    const data = {
      keyword: name,
    };
    const result = await this.searchService.findInstagram(data);
    return result;
  }

  @Post('StartEngine/CronJob/Tiktok')
  async cronJobTiktok() {
    const name = await this.topicService.findAllKeyword();
    const data = {
      keyword: name,
    };
    const result = await this.searchService.findTiktok(data);
    return result;
  }

  @Post('StartEngine/CronJob/Facebook')
  async cronJobFacebook() {
    const name = await this.topicService.findAllKeyword();
    const data = {
      keyword: name,
    };
    const result = await this.searchService.findFacebook(data);
    return result;
  }

  @Post('StartEngine/CronJob/News')
  async cronJobNews() {
    const name = await this.topicService.findAllKeyword();
    const data = {
      keyword: name,
    };
    const result = await Promise.all(
      data.keyword.map(async (element) => {
        try {
          const data = await this.searchService.findGoogleNews(element);
          return data;
        } catch (error) {
          return 'Failure';
        }
      }),
    );
    return result;
  }
}
