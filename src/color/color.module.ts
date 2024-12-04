import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from 'src/marcas/entities/marca.entity';
import { Color } from './entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  exports: [ColorService],
  controllers: [ColorController],
  providers: [ColorService],
})
export class ColorModule {}
