import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { generateUUID } from 'src/bcrypt';
import * as moment from 'moment';
import * as SHA256 from 'crypto-js/sha256';
import * as MD5 from 'crypto-js/md5';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schema/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { User } from 'src/master/user/schema/user.schema';
import { async } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private paymentModel: mongoose.Model<Payment>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) { }

  async update(id: string) {
    return await this.paymentModel.findByIdAndUpdate(id, {
      isActive: false
    });
  }

  async findPaymentOne(id: string, interest: any) {
    const Transaction = await this.paymentModel.find({
      idUser: { $in: id },
      isActive: { $in: true },
    });
    const item = [];
    Transaction.forEach((element) => {
      item.push({
        merchantCode: element.merchantCode,
        reference: element.reference,
        paymentUrl: element.paymentUrl,
        vaNumber: element.vaNumber,
        amount: element.amount,
        statusCode: element.statusCode,
        statusMessage: element.statusMessage,
        idSubscription: element.idSubscription,
        idUser: element.idUser,
        isActive: element.isActive,
        createdAt: element.createdAt,
        endDate: element.endDate,
        subscription: interest.find(
          (items) => items.id === element.idSubscription,
        ),
      });
    });
    if (item[0] === undefined) {
      throw new InternalServerErrorException('Not have payment');
    }
    return item[0];
  }

  async paymentApproval(formData: any) {
    const Transaction = await this.paymentModel.findById(
      formData.merchantOrderId,
    );
    if (Transaction === null) {
      throw new NotFoundException('Data Not Found');
    }
    await this.paymentModel.findByIdAndUpdate(formData.merchantOrderId, {
      isActive: true,
    });
    return Transaction;
  }

  async findOneTransactionbyUser(interest: any, req: any, header: any) {
    const Transaction = await this.paymentModel.find({
      idUser: { $in: header.id },
      isActive: { $in: req.query.isActive },
    });
    const item = [];
    Transaction.forEach((element) => {
      item.push({
        merchantCode: element.merchantCode,
        reference: element.reference,
        paymentUrl: element.paymentUrl,
        vaNumber: element.vaNumber,
        amount: element.amount,
        statusCode: element.statusCode,
        statusMessage: element.statusMessage,
        idSubscription: element.idSubscription,
        idUser: element.idUser,
        isActive: element.isActive,
        createdAt: element.createdAt,
        endDate: element.endDate,
        subscription: interest.find(
          (items) => items.id === element.idSubscription,
        ),
      });
    });
    return item;
  }

  async findAllTransactionbyUser(interest: any, req: any, header: any) {
    const transactions = await this.paymentModel.find({
      isActive: { $in: req.query.isActive },
    });

    const items = [];

    for (const element of transactions) {
      const userData = await this.userModel.findById(element.idUser);

      items.push({
        merchantCode: element.merchantCode,
        reference: element.reference,
        paymentUrl: element.paymentUrl,
        vaNumber: element.vaNumber,
        amount: element.amount,
        statusCode: element.statusCode,
        statusMessage: element.statusMessage,
        idSubscription: element.idSubscription,
        idUser: element.idUser,
        isActive: element.isActive,
        createdAt: element.createdAt,
        endDate: element.endDate,
        id: element.id,

        subscription: interest.find(
          (item) => item.id === element.idSubscription,
        ),
        user: userData,
      });
    }

    return items;
  }

  async findAllUser(interest: any, req: any, header: any) {
    const transactions = await this.paymentModel.find({
      isActive: { $in: req.query.isActive },
    });

    const items = [];

    for (const element of transactions) {
      const userData = await this.userModel.findById(element.idUser);

      items.push({
        merchantCode: element.merchantCode,
        reference: element.reference,
        paymentUrl: element.paymentUrl,
        vaNumber: element.vaNumber,
        amount: element.amount,
        statusCode: element.statusCode,
        statusMessage: element.statusMessage,
        idSubscription: element.idSubscription,
        idUser: element.idUser,
        isActive: element.isActive,
        createdAt: element.createdAt,
        endDate: element.endDate,
        subscription: interest.find(
          (item) => item.id === element.idSubscription,
        ),
        user: userData,
      });
    }

    return items;
  }

  async findOne() {
    const datetime = moment().format('yyyy-MM-DD HH:mm:ss');
    const hash = SHA256(
      'DS16190' + '10000' + datetime + 'd45f0ff05e0147b7eb7053b0aa1a0224',
    ).toString();
    const url =
      'https://sandbox.duitku.com/webapi/api/merchant/paymentmethod/getpaymentmethod';
    const data = {
      merchantcode: 'DS16190',
      amount: '10000',
      datetime: datetime,
      signature: hash,
    };

    const headers = {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer your_token',
    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    };

    const getData = await fetch(url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        return data;
      })
      .catch((error) => {
        // console.log(error);
        return [];
      });

    return getData;
  }

  async payment(
    dataUser: any,
    dataSubscription: any,
    createPaymentDto: CreatePaymentDto,
  ) {
    const { idSubscription, paymentMethod, phoneNumber } = createPaymentDto;
    const url = 'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry';
    const merchantOrder = await generateUUID();
    const hash = MD5(
      'DS16190' +
      merchantOrder +
      dataSubscription.balance +
      'd45f0ff05e0147b7eb7053b0aa1a0224',
    ).toString();
    const data = {
      merchantCode: 'DS16190',
      paymentAmount: dataSubscription.balance,
      paymentMethod: paymentMethod,
      merchantOrderId: merchantOrder,
      productDetails: dataSubscription.fullName,
      additionalParam: '',
      merchantUserInfo: '',
      customerVaName: dataUser.fullName,
      email: dataUser.email,
      phoneNumber: phoneNumber,
      itemDetails: [
        {
          name: dataUser.fullName,
          price: dataSubscription.balance,
          quantity: 1,
        },
      ],
      callbackUrl:
        'https://elevatehub-nest-backend-jipmjlxdrq-uc.a.run.app/Payment/callback',
      returnUrl: 'https://elevatehubvue.web.app/member#topic',
      signature: hash,
      expiryPeriod: 15,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    };
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);
    const getData = await fetch(url, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const Subscription = this.paymentModel.create({
          _id: merchantOrder,
          idSubscription: idSubscription,
          idUser: dataUser.id,
          isActive: false,
          isPending: true,
          signature: hash,
          createdAt: new Date(),
          endDate: currentDate,
          ...data,
        });
        return Subscription;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
    return getData;
  }

  async remove(id: string): Promise<Payment> {
    return await this.paymentModel.findByIdAndDelete(id);
  }
}
