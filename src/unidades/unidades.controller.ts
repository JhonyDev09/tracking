import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { UnidadesService } from './unidades.service';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { Unidade } from './entities/unidade.entity';

@Controller('unidades')
export class UnidadesController {

  constructor(private readonly unidadesService: UnidadesService) {}

  @Post()
  async create(@Body() createUnidadeDto: CreateUnidadeDto): Promise<Unidade> {
    try{
      const dispositivo = await this.unidadesService.create(createUnidadeDto);
      return dispositivo;
    }catch(error){
      throw new HttpException('Error al registrar la Unidad: ', HttpStatus.BAD_REQUEST);
    }
     
  }

  @Get()
  findAll(): Promise <Unidade[]> {
    return this.unidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Unidade[]> {
    return this.unidadesService.findOne(+id)
  }

  @Patch(':id/edit')
  async update(@Param('id') id: string, @Body() updateUnidadeDto: UpdateUnidadeDto): Promise<Unidade[]> {
    try{
      const dispositivo = await this.unidadesService.update(+id, updateUnidadeDto);
      return dispositivo
    }catch(error){
      throw new HttpException("Error al actualizar los datos", HttpStatus.BAD_REQUEST)
    }
    
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try{
      return this.unidadesService.remove(+id);
    }catch(error){
      throw new HttpException("Error al eliminar los datos", HttpStatus.BAD_REQUEST);
    }
  }
}


