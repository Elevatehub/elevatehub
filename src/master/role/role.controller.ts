import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Request,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/auth.guard';
import { Role } from './schema/role.schema';
import { checkBlacklist } from 'src/bcrypt';
import { UserService } from '../user/user.service';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Role')
@Controller('Role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  @Post('')
  async create(@Request() req, @Body() createRoleDto: CreateRoleDto) {
    await checkBlacklist(req, this.userService, '64ae4b5c8fe7d20417e6f1d8');
    return this.roleService.create(createRoleDto);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async findAll(@Request() req) {
    await checkBlacklist(req, this.userService, '64ae4b5c8fe7d20417e6f1d8');
    return this.roleService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Request() req, @Param('id') id: string): Promise<Role> {
    await checkBlacklist(req, this.userService, '64ae4b5c8fe7d20417e6f1d8');
    return this.roleService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    await checkBlacklist(req, this.userService, '64ae4b5c8fe7d20417e6f1d8');
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Request() req, @Param('id') id: string) {
    await checkBlacklist(req, this.userService, '64ae4b5c8fe7d20417e6f1d8');
    return this.roleService.remove(id);
  }
}
