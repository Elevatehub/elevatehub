import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { HashtagSchema } from './schema/hashtag.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Hashtag', schema: HashtagSchema }]),
  ],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}
