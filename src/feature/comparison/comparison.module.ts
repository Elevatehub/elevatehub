import { Module } from '@nestjs/common';
import { ComparisonService } from './comparison.service';
import { ComparisonController } from './comparison.controller';

@Module({
  controllers: [ComparisonController],
  providers: [ComparisonService]
})
export class ComparisonModule {}
