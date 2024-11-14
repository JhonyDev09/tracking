import { Module } from '@nestjs/common';
import { DispUnidadService } from './disp-unidad.service';
import { DispUnidadController } from './disp-unidad.controller';

@Module({
  controllers: [DispUnidadController],
  providers: [DispUnidadService],
})
export class DispUnidadModule {}
