import { Module } from '@nestjs/common';
import { DataBankService } from './data-bank.service';
import { DataBankController } from './data-bank.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchSchema } from 'src/search/schema/search.schema';
import { SearchService } from 'src/search/search.service';
import { HashtagSchema } from 'src/hashtag/schema/hashtag.schema';
import { HashtagService } from 'src/hashtag/hashtag.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Search', schema: SearchSchema }]),
    MongooseModule.forFeature([{ name: 'Hashtag', schema: HashtagSchema }]),
  ],
  controllers: [DataBankController],
  providers: [DataBankService, SearchService, HashtagService],
})
export class DataBankModule {}
