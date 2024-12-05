import { Module } from '@nestjs/common';
import { UsrUnidadService } from './usr-unidad.service';
import { UsrUnidadController } from './usr-unidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsrUnidad } from './entities/usr-unidad.entity';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { EmpleadoModule } from 'src/empleado/empleado.module';
import { UnidadesModule } from 'src/unidades/unidades.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsrUnidad, Dispositivo, Empleado]), EmpleadoModule, UnidadesModule],
  controllers: [UsrUnidadController],
  providers: [UsrUnidadService],
})
export class UsrUnidadModule {}
