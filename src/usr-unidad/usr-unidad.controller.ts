import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsrUnidadService } from './usr-unidad.service';
import { CreateUsrUnidadDto } from './dto/create-usr-unidad.dto';
import { UpdateUsrUnidadDto } from './dto/update-usr-unidad.dto';

@Controller('usr-unidad')
export class UsrUnidadController {
  constructor(private readonly usrUnidadService: UsrUnidadService) {}

  @Post()
  create(@Body() createUsrUnidadDto: CreateUsrUnidadDto) {
    return this.usrUnidadService.create(createUsrUnidadDto);
  }

  @Get()
  findAll() {
    return this.usrUnidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usrUnidadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsrUnidadDto: UpdateUsrUnidadDto) {
    return this.usrUnidadService.update(+id, updateUsrUnidadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usrUnidadService.remove(+id);
  }
}
