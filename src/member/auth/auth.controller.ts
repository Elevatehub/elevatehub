import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from 'src/core/auth.guard';
import { RoleService } from 'src/master/role/role.service';
import { CreateUserDto } from 'src/master/user/dto/create-user.dto';
import { UserService } from 'src/master/user/user.service';
import { extractTokenFromHeader, tokenJwt } from 'src/bcrypt';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) { }

  @Post('login')
  async create(@Body() loginAuthDto: LoginAuthDto) {
    const item = await this.authService.login(loginAuthDto);
    const checkRole = await this.roleService.findOne(item.role);
    const result = {
      access_token: item.access_token,
      role: checkRole.fullName,
      username: item.username,
    };
    return result;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
    return { message: 'Pendaftaran Berhasil Silahkan Login' };
  }

  @Get('verifySession')
  @UseGuards(AuthGuard)
  async verify(@Request() req) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    const data = await this.userService.findOne(header.id);
    return {
      code: 200,
      message: data,
    };
  }
}
