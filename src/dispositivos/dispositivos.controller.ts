import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispositivosService } from './dispositivos.service';
import { CreateDispositivoDto } from './dto/create-dispositivo.dto';
import { UpdateDispositivoDto } from './dto/update-dispositivo.dto';
import { Dispositivo } from './entities/dispositivo.entity';

@Controller('dispositivos')
export class DispositivosController {
  
  constructor(private readonly dispositivoService: DispositivosService) {}

  @Post()
  async create (@Body() createDispositivoDto: CreateDispositivoDto): Promise<Dispositivo>{
    try{
      const dispositivo = await this.dispositivoService.create(createDispositivoDto);
      return  dispositivo;
    }catch(error){
      throw error;
    }
  }

  @Get()
  async findAll(): Promise <Dispositivo[]>{
    return this.dispositivoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise <Dispositivo>{
    return this.dispositivoService.findOne(+id);
  }

  @Patch(':id/edit')
  async update(
    @Param('id') id: string,
    @Body() updateDispositivoDto: UpdateDispositivoDto,
  ): Promise<Dispositivo>{
    try{
      const dispositivo = await this.dispositivoService.update(+id, updateDispositivoDto);
      return dispositivo;
    }catch (error){
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise <void>{
    try{   
      return this.dispositivoService.remove(+id);
    }catch (error){
      throw error;
    }
  }
}
