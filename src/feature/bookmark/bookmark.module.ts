import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/master/user/schema/user.schema';
import { UserService } from 'src/master/user/user.service';
import { PaymentSchema } from 'src/member/payment/schema/payment.schema';
import { PaymentService } from 'src/member/payment/payment.service';
import { SubscriptionSchema } from 'src/master/subscription/schema/subscription.schema';
import { SubscriptionService } from 'src/master/subscription/subscription.service';
import { SearchSchema } from 'src/search/schema/search.schema';
import { SearchService } from 'src/search/search.service';
import { HashtagSchema } from 'src/hashtag/schema/hashtag.schema';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { BookmarkSchema } from './schema/bookmark.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Bookmark', schema: BookmarkSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: 'Search', schema: SearchSchema }]),
    MongooseModule.forFeature([{ name: 'Hashtag', schema: HashtagSchema }]),
    MongooseModule.forFeature([
      { name: 'Subscription', schema: SubscriptionSchema },
    ]),
  ],
  controllers: [BookmarkController],
  providers: [
    BookmarkService,
    SearchService,
    UserService,
    PaymentService,
    SubscriptionService,
    HashtagService,
  ],
})
export class BookmarkModule { }
