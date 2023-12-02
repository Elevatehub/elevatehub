import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentSchema } from './schema/payment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { urlencoded } from 'express';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SubscriptionSchema } from 'src/master/subscription/schema/subscription.schema';
import { SubscriptionService } from 'src/master/subscription/subscription.service';
import { UserSchema } from 'src/master/user/schema/user.schema';
import { UserService } from 'src/master/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
    MongooseModule.forFeature([
      { name: 'Subscription', schema: SubscriptionSchema },
    ]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    SubscriptionService,
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useValue: urlencoded({ extended: true }),
    },
  ],
})
export class PaymentModule {}
