import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  Body,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/core/auth.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApprovalPaymentDto } from './dto/pproval-payment.dto';
import { SubscriptionService } from 'src/master/subscription/subscription.service';
import { extractTokenFromHeader, tokenJwt } from 'src/bcrypt';
import { UserService } from 'src/master/user/user.service';

@ApiBearerAuth()
@ApiCookieAuth()
@ApiTags('Payment')
@Controller('Payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly subscriptionService: SubscriptionService,
    private readonly userService: UserService,
  ) { }

  @UseGuards(AuthGuard)
  @Get('method')
  listMethod() {
    return this.paymentService.findOne();
  }

  @UseGuards(AuthGuard)
  @Post('order')
  async payment(@Request() req, @Body() createPaymentDto: CreatePaymentDto) {
    const header: tokenJwt = await extractTokenFromHeader(req);
    const dataUser = await this.userService.findOne(header.id);
    const dataSubscription = await this.subscriptionService.findOne(
      createPaymentDto.idSubscription,
    );
    return this.paymentService.payment(
      dataUser,
      dataSubscription,
      createPaymentDto,
    );
  }

  @Post('callback')
  @ApiResponse({ status: 200, description: 'Success' })
  paymentcallback2(@Req() request: Request) {
    const formData = request.body;
    return this.paymentService.paymentApproval(formData);
  }

  @UseGuards(AuthGuard)
  @Get('User/Active')
  @UseGuards(AuthGuard)
  async findOnebyUser(@Request() req) {
    const interest = await this.subscriptionService.findAll();
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.paymentService.findPaymentOne(header.id, interest);
  }

  @UseGuards(AuthGuard)
  @Get('User')
  @UseGuards(AuthGuard)
  @ApiQuery({ name: 'isActive', type: Boolean })
  async findOneTransactionbyUser(@Request() req) {
    const interest = await this.subscriptionService.findAll();
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.paymentService.findOneTransactionbyUser(interest, req, header);
  }

  @UseGuards(AuthGuard)
  @Get('User/All')
  @UseGuards(AuthGuard)
  @ApiQuery({ name: 'isActive', type: Boolean })
  async findAllTransactionbyUser(@Request() req) {
    const interest = await this.subscriptionService.findAll();
    const header: tokenJwt = await extractTokenFromHeader(req);
    return this.paymentService.findAllTransactionbyUser(interest, req, header);
  }

  @Put('User/Disable/:id')
  @UseGuards(AuthGuard)
  async update(@Request() req, @Param('id') id: string) {
    return this.paymentService.update(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
