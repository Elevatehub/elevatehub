import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { CreateComparisonDto } from './dto/create-comparison.dto';
import { UpdateComparisonDto } from './dto/update-comparison.dto';

import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/auth.guard';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Comparison')
@Controller('Comparison')
@Controller('comparison')
export class ComparisonController {
  constructor(private readonly comparisonService: ComparisonService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createComparisonDto: CreateComparisonDto) {
    return this.comparisonService.create(createComparisonDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.comparisonService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comparisonService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComparisonDto: UpdateComparisonDto,
  ) {
    return this.comparisonService.update(+id, updateComparisonDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comparisonService.remove(+id);
  }
}
