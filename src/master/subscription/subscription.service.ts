import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Subscription } from './schema/subscription.schema';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionsModel: mongoose.Model<Subscription>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const Subscription = await this.subscriptionsModel.create(
      createSubscriptionDto,
    );
    return Subscription;
  }

  async findAll(): Promise<Subscription[]> {
    const Subscription = await this.subscriptionsModel.find();
    return Subscription;
  }

  async findOne(id: string): Promise<Subscription> {
    const data = await this.subscriptionsModel.findById(id);
    if (data.id === undefined) {
      throw new NotFoundException('User Not Found');
    }
    return data;
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    return await this.subscriptionsModel.findByIdAndUpdate(
      id,
      updateSubscriptionDto,
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async remove(id: string): Promise<Subscription> {
    return await this.subscriptionsModel.findByIdAndDelete(id);
  }
}
