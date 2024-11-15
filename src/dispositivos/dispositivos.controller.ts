import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispositivosService } from './dispositivos.service';
import { CreateDispositivoDto } from './dto/create-dispositivo.dto';
import { UpdateDispositivoDto } from './dto/update-dispositivo.dto';
import { Dispositivo } from './entities/dispositivo.entity';

@Controller('dispositivos')
export class DispositivosController {
  [x: string]: any;
  constructor(private readonly dispositivoService: DispositivosService) {}

  @Post()
  async create (@Body() createDispositivoDto: CreateDispositivoDto): Promise<Dispositivo>{
    return this.dispositivoService.create(createDispositivoDto);
  }

  @Get()
  async findAll(): Promise <Dispositivo[]>{
    return this.dispositivoService.findAll();
  }
}
