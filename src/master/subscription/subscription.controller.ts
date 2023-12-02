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
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/auth.guard';
import { Subscription } from './schema/subscription.schema';
import { checkBlacklist } from 'src/bcrypt';
import { UserService } from '../user/user.service';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Subscription')
@Controller('Subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionsService: SubscriptionService,
    private readonly userService: UserService,
  ) { }

  @Post('')
  @UseGuards(AuthGuard)
  async create(
    @Request() req,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    await checkBlacklist(req, this.userService, '64ae4b5c8fe7d20417e6f1d8');
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get('')
  async findAll(@Request() req): Promise<Subscription[]> {
    // await checkBlacklist(req, this.userService, '');
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(
    @Request() req,
    @Param('id') id: string,
  ): Promise<Subscription> {
    await checkBlacklist(req, this.userService, '64ae4b5c8fe7d20417e6f1d8');
    return this.subscriptionsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    await checkBlacklist(req, this.userService, '64ae4b5c8fe7d20417e6f1d8');
    return this.subscriptionsService.update(id, updateSubscriptionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Request() req, @Param('id') id: string) {
    await checkBlacklist(req, this.userService, '64ae4b5c8fe7d20417e6f1d8');
    return this.subscriptionsService.remove(id);
  }
}
