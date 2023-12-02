import {
  Controller,
  Injectable,
  Get,
  Post,
  Param,
  Request,
  Body,
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { LandingService } from './landing.service';
import { Landing } from './schema/landing.schema';
import { CreateLandingDto } from './dto/create-landing.dto';
import { CreateLandingChildDto } from './dto/create-landingChild.dto';

@ApiCookieAuth()
@ApiTags('Landing')
@Controller('Landing')
@Injectable()
export class LandingController {
  constructor(private readonly landingService: LandingService) { }

  @Get()
  async findAll(): Promise<Landing[]> {
    return this.landingService.findAll();
  }
  @Post('Child/:id/:section')
  async editTentangKamiChild(
    @Request() req,
    @Param('id') id: string,
    @Param('section') section: string,
    @Body() postDto: CreateLandingChildDto,
  ) {
    return this.landingService.updateTentangKamiChild(id, section, postDto);
  }

  @Post(':id')
  async editTentangKami(
    @Request() req,
    @Param('id') id: string,
    @Body() postDto: CreateLandingDto,
  ) {
    return this.landingService.updateTentangKami(id, postDto);
  }
}
