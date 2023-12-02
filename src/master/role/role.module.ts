import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleSchema } from './schema/role.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [RoleController],
  providers: [RoleService, UserService],
})
export class RoleModule {}
