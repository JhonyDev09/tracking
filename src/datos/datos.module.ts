import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dato } from './entities/dato.entity';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { DatosController } from './datos.controller';
import { DatosService } from './datos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dato, Dispositivo])],
  controllers: [DatosController],
  providers: [DatosService],
})
export class DatosModule {}
