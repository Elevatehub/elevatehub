import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchSchema } from './schema/search.schema';
import { HashtagService } from '../hashtag/hashtag.service';
import { HashtagSchema } from '../hashtag/schema/hashtag.schema';
import { TopicSchema } from 'src/feature/topic/schema/topic.schema';
import { UserSchema } from 'src/master/user/schema/user.schema';
import { UserService } from 'src/master/user/user.service';
import { TopicService } from 'src/feature/topic/topic.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Search', schema: SearchSchema }]),
    MongooseModule.forFeature([{ name: 'Hashtag', schema: HashtagSchema }]),
    MongooseModule.forFeature([{ name: 'Topic', schema: TopicSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [SearchController],
  providers: [SearchService, HashtagService, UserService, TopicService],
})
export class SearchModule {}
