import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { encodePassword } from 'src/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    await this.checkAvailableUser(email);
    const hash = await encodePassword(password);
    const users = await this.userModel.create(createUserDto);
    const payload = { id: users._id, email: users.email };
    await this.userModel.findByIdAndUpdate(
      users.id,
      { password: hash },
      {
        new: true,
        runValidators: false,
      },
    );
    return {
      data: users,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(id: string): Promise<User> {
    const data = await this.userModel.findById(id);
    if (data.id === undefined) {
      throw new NotFoundException('User Not Found');
    }
    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async checkAvailableUser(email: string) {
    const userDb = await this.userModel.findOne({ email: email });
    if (userDb) throw new NotFoundException('Email Registered');
    return userDb;
  }
}
