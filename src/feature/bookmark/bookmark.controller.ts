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
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { ApiBearerAuth, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/auth.guard';
import { Bookmark } from './schema/bookmark.schema';
import { checkBlacklist, extractTokenFromHeader, tokenJwt } from 'src/bcrypt';
import { UserService } from 'src/master/user/user.service';
import { SubscriptionService } from 'src/master/subscription/subscription.service';
import { PaymentService } from 'src/member/payment/payment.service';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Website')
@Controller('Website')
export class BookmarkController {
  constructor(
    private readonly BookmarkService: BookmarkService,
    private readonly userService: UserService,
    private readonly paymentService: PaymentService,
    private readonly subscriptionService: SubscriptionService,
  ) { }

  @Post('')
  async create(@Request() req, @Body() createBookmarkDto: CreateBookmarkDto) {
    // await checkBlacklist(req, this.userService, '');
    const header: tokenJwt = await extractTokenFromHeader(req);
    const interest = await this.subscriptionService.findAll();
    const dataSubscription = await this.paymentService.findPaymentOne(
      header.id,
      interest,
    );
    const dataThreads = await this.BookmarkService.findAll(header);
    if (dataSubscription.subscription.threads <= dataThreads.length) {
      throw new InternalServerErrorException(
        'You have maximum threads, contact customer service for ubgrade plan',
      );
    }
    return this.BookmarkService.create(createBookmarkDto, header);
  }

  @Get('')
  @UseGuards(AuthGuard)
  async findAll(@Request() req) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    await checkBlacklist(req, this.userService, '');
    return this.BookmarkService.findAll(header);
  }

  @Get('Keyword')
  @UseGuards(AuthGuard)
  async findGlobal(@Request() req) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    await checkBlacklist(req, this.userService, '');
    return this.BookmarkService.findKeyword(header);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Request() req, @Param('id') id: string): Promise<Bookmark> {
    await checkBlacklist(req, this.userService, '');
    return this.BookmarkService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    await checkBlacklist(req, this.userService, '');
    return this.BookmarkService.update(id, updateBookmarkDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Request() req, @Param('id') id: string) {
    await checkBlacklist(req, this.userService, '');
    return this.BookmarkService.remove(id);
  }
}
