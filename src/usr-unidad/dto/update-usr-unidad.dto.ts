import { PartialType } from '@nestjs/mapped-types';
import { CreateUsrUnidadDto } from './create-usr-unidad.dto';

export class UpdateUsrUnidadDto extends PartialType(CreateUsrUnidadDto) {}
