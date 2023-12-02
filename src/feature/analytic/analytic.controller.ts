import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AnalyticService } from './analytic.service';
import { CreateAnalyticDto } from './dto/create-analytic.dto';
import { UpdateAnalyticDto } from './dto/update-analytic.dto';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/auth.guard';
import { extractTokenFromHeader } from 'src/bcrypt';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Analytic')
@Controller('Analytic')
export class AnalyticController {
  constructor(private readonly analyticService: AnalyticService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAnalyticDto: CreateAnalyticDto) {
    return this.analyticService.create(createAnalyticDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req) {
    const header = await extractTokenFromHeader(req);
    console.log(header);
    return this.analyticService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analyticService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnalyticDto: UpdateAnalyticDto,
  ) {
    return this.analyticService.update(+id, updateAnalyticDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.analyticService.remove(+id);
  }
}
