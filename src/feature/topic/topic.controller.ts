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
  InternalServerErrorException,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/auth.guard';
import { Topic } from './schema/topic.schema';
import { checkBlacklist, extractTokenFromHeader, tokenJwt } from 'src/bcrypt';
import { UserService } from 'src/master/user/user.service';
import { SubscriptionService } from 'src/master/subscription/subscription.service';
import { PaymentService } from 'src/member/payment/payment.service';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Topic')
@Controller('Topic')
export class TopicController {
  constructor(
    private readonly TopicService: TopicService,
    private readonly userService: UserService,
    private readonly paymentService: PaymentService,
    private readonly subscriptionService: SubscriptionService,
  ) { }

  @Post('')
  async create(@Request() req, @Body() createTopicDto: CreateTopicDto) {
    await checkBlacklist(req, this.userService, '');
    const header: tokenJwt = await extractTokenFromHeader(req);
    const interest = await this.subscriptionService.findAll();
    const dataSubscription = await this.paymentService.findPaymentOne(
      header.id,
      interest,
    );
    const dataThreads = await this.TopicService.findAll(header);
    if (dataSubscription.subscription.threads <= dataThreads.length) {
      throw new InternalServerErrorException(
        'You have maximum threads, contact customer service for ubgrade plan',
      );
    }
    return this.TopicService.create(createTopicDto, header);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async findAll(@Request() req) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    await checkBlacklist(req, this.userService, '');
    return this.TopicService.findAll(header);
  }

  @Get('Keyword')
  @UseGuards(AuthGuard)
  async findGlobal(@Request() req) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    await checkBlacklist(req, this.userService, '');
    return this.TopicService.findKeyword(header);
  }

  @Get('AllKeyword')
  @UseGuards(AuthGuard)
  async findAllGlobal(@Request() req) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    await checkBlacklist(req, this.userService, '');
    return this.TopicService.findAllKeyword();
  }

  @Get('AllEntity')
  @UseGuards(AuthGuard)
  async findAllEntity(@Request() req) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    await checkBlacklist(req, this.userService, '');
    return this.TopicService.findAllEntity(header);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Request() req, @Param('id') id: string): Promise<Topic> {
    await checkBlacklist(req, this.userService, '');
    return this.TopicService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    await checkBlacklist(req, this.userService, '');
    return this.TopicService.update(id, updateTopicDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Request() req, @Param('id') id: string) {
    await checkBlacklist(req, this.userService, '');
    return this.TopicService.remove(id);
  }
}
