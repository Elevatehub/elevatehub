import { PartialType } from '@nestjs/swagger';
import { CreateDataBankDto } from './create-data-bank.dto';

export class UpdateDataBankDto extends PartialType(CreateDataBankDto) {}
