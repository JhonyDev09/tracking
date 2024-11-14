import { Module } from '@nestjs/common';
import { UsrUnidadService } from './usr-unidad.service';
import { UsrUnidadController } from './usr-unidad.controller';

@Module({
  controllers: [UsrUnidadController],
  providers: [UsrUnidadService],
})
export class UsrUnidadModule {}
