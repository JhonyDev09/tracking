import { Module } from '@nestjs/common';
import { TiposService } from './tipos.service';
import { TiposController } from './tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipo } from './entities/tipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tipo])],
  exports: [TiposService],
  controllers: [TiposController],
  providers: [TiposService],
})
export class TiposModule {}
