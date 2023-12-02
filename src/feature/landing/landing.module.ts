import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LandingService } from './landing.service';
import { LandingController } from './landing.controller';
import { LandingSchema } from './schema/landing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Landing', schema: LandingSchema }]),
  ],
  controllers: [LandingController],
  providers: [LandingService],
})
export class LandingModule {}
