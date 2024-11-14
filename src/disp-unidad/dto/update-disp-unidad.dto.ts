import { PartialType } from '@nestjs/mapped-types';
import { CreateDispUnidadDto } from './create-disp-unidad.dto';

export class UpdateDispUnidadDto extends PartialType(CreateDispUnidadDto) {}
