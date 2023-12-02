import { PartialType } from '@nestjs/swagger';
import { CreateOpenapiDto } from './create-openapi.dto';

export class UpdateOpenapiDto extends PartialType(CreateOpenapiDto) {}
