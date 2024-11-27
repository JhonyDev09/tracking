import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { Empleado } from './entities/empleado.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[Empleado, Rol, TypeOrmModule.forFeature([Empleado])],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
  exports: [EmpleadoService],
})
export class EmpleadoModule {}
