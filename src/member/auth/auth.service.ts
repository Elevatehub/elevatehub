/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { comparePassword } from 'src/bcrypt';
import { User } from 'src/master/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) { }

  @UseGuards()
  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const cekUserAvailable = await this.checkAvailableUser(email);
    await this.checkPasswordUser(password, cekUserAvailable.password);
    const payload = { id: cekUserAvailable.id }
    const resultValue = {
      id: cekUserAvailable.id,
      username: cekUserAvailable.fullName,
      role: cekUserAvailable.idRole,
      access_token: await this.jwtService.signAsync(payload)
    };
    return resultValue;
  }

  async checkAvailableUser(email: string) {
    const userDb = await this.userModel.findOne({ email: email });
    if (!userDb) throw new NotFoundException('Email Not Registered');
    return userDb;
  }
  async checkPasswordUser(password: string, passwordDb: string) {
    const cekPassword = await comparePassword(password, passwordDb);
    if (!cekPassword) throw new NotFoundException('Wrong Email and Password');
    return cekPassword;
  }
}