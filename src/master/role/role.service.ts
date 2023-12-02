import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from './schema/role.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: mongoose.Model<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleModel.create(createRoleDto);
    return role;
  }

  async findAll(): Promise<Role[]> {
    const role = await this.roleModel.find();
    return role;
  }

  async findOne(id: string): Promise<Role> {
    const data = await this.roleModel.findById(id);
    if (data.id === undefined) {
      throw new NotFoundException('User Not Found');
    }
    return data;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.roleModel.findByIdAndUpdate(id, updateRoleDto, {
      new: true,
      runValidators: true,
    });
  }

  async remove(id: string): Promise<Role> {
    return await this.roleModel.findByIdAndDelete(id);
  }
}
