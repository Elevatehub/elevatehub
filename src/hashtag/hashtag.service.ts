import { Injectable } from '@nestjs/common';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { Hashtag } from './schema/hashtag.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateHashtagBankDto } from 'src/data-bank/dto/hashtag-data-bank.dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectModel(Hashtag.name)
    private hashtagModel: mongoose.Model<Hashtag>,
  ) {}
  async create(createHashtagDto: CreateHashtagDto) {
    const Item = await this.hashtagModel.create(createHashtagDto);
    return Item;
  }

  async findAll(items: CreateHashtagBankDto) {
    const { keyword } = items;
    const Transaction = await this.hashtagModel.find({
      keyword: { $in: keyword },
    });
    return Transaction;
  }
}
