import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './master/role/role.module';
import { SubscriptionModule } from './master/subscription/subscription.module';
import { AnalyticModule } from './feature/analytic/analytic.module';
import { BookmarkModule } from './feature/bookmark/bookmark.module';
import { ComparisonModule } from './feature/comparison/comparison.module';
import { TopicModule } from './feature/topic/topic.module';
import { AuthModule } from './member/auth/auth.module';
import { PaymentModule } from './member/payment/payment.module';
import { UserModule } from './master/user/user.module';
import { LandingModule } from './feature/landing/landing.module';
import { SearchModule } from './search/search.module';
import { OpenapiModule } from './openapi/openapi.module';
import { DataBankModule } from './data-bank/data-bank.module';
import { HashtagModule } from './hashtag/hashtag.module';
/////

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AuthModule,
    SubscriptionModule,
    RoleModule,
    PaymentModule,
    TopicModule,
    AnalyticModule,
    ComparisonModule,
    BookmarkModule,
    LandingModule,
    SearchModule,
    OpenapiModule,
    DataBankModule,
    HashtagModule,
  ],
})
export class AppModule {}
