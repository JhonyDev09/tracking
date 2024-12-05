import { Module } from '@nestjs/common';
import { DispUnidadService } from './disp-unidad.service';
import { DispUnidadController } from './disp-unidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispUnidad } from './entities/disp-unidad.entity';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { Unidade } from 'src/unidades/entities/unidade.entity';


@Module({
  imports: [TypeOrmModule.forFeature([DispUnidad, Dispositivo, Unidade])],
  controllers: [DispUnidadController],
  providers: [DispUnidadService],
})
export class DispUnidadModule {}
