import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/core/constant';
import { RoleSchema } from 'src/master/role/schema/role.schema';
import { RoleService } from 'src/master/role/role.service';
import { UserSchema } from 'src/master/user/schema/user.schema';
import { UserService } from 'src/master/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, RoleService],
})
export class AuthModule {}
