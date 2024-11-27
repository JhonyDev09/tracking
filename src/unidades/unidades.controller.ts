import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { Unidade } from './entities/unidade.entity';

@Controller('unidades')
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

 
  

  @Get()
  findAll() {
    return this.unidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnidadeDto: UpdateUnidadeDto) {
    return this.unidadesService.update(+id, updateUnidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadesService.remove(+id);
  }
}
