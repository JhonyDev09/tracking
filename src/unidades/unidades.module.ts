import { Module } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { UnidadesController } from './unidades.controller';
import { Unidade } from './entities/unidade.entity';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Modelo } from 'src/modelos/entities/modelo.entity';
import { Status } from 'src/status/entities/status.entity';
import { Color } from 'src/color/entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipo } from 'src/tipos/entities/tipo.entity';

@Module({
  imports: [Unidade, Marca, Modelo, Status, Color, Tipo, TypeOrmModule.forFeature([Unidade])],
  controllers: [UnidadesController],
  providers: [UnidadesService],
  exports: [UnidadesService]
})
export class UnidadesModule {}
