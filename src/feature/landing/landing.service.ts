import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Landing } from './schema/landing.schema';
import { CreateLandingDto } from './dto/create-landing.dto';
import { CreateLandingChildDto } from './dto/create-landingChild.dto';

export class LandingService {
  constructor(
    @InjectModel(Landing.name)
    private LandingModel: mongoose.Model<Landing>,
  ) { }

  async findAll(): Promise<Landing[]> {
    const role = await this.LandingModel.find();
    return role;
  }

  async updateTentangKamiChild(
    id: string,
    section: string,
    postDto: CreateLandingChildDto,
  ) {
    const about = await this.LandingModel.findByIdAndUpdate(
      id,
      {
        $set: {
          [`child.${section}.header`]: postDto.header,
          [`child.${section}.value`]: postDto.value,
          [`child.${section}.icon`]: postDto.icon,
        },
      },
      { new: true },
    );

    if (!about) {
      // Handle if document not found
    }

    return about;
  }

  async updateTentangKami(id: string, postDto: CreateLandingDto) {
    const about = await this.LandingModel.findByIdAndUpdate(
      id,
      {
        $set: {
          [`header`]: postDto.header,
          [`description`]: postDto.description,
        },
      },
      { new: true },
    );

    if (!about) {
      // Handle if document not found
    }

    return about;
  }
}
