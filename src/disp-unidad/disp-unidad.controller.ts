import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispUnidadService } from './disp-unidad.service';
import { CreateDispUnidadDto } from './dto/create-disp-unidad.dto';
import { UpdateDispUnidadDto } from './dto/update-disp-unidad.dto';

@Controller('disp-unidad')
export class DispUnidadController {
  constructor(private readonly dispUnidadService: DispUnidadService) {}

  @Post()
  create(@Body() createDispUnidadDto: CreateDispUnidadDto) {
    return this.dispUnidadService.create(createDispUnidadDto);
  }

  @Get()
  findAll() {
    return this.dispUnidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispUnidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDispUnidadDto: UpdateDispUnidadDto) {
    return this.dispUnidadService.update(+id, updateDispUnidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispUnidadService.remove(+id);
  }
}
