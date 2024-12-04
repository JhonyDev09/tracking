import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarcasService } from './marcas.service';
//import { CreateMarcaDto } from './dto/create-marca.dto';
//import { UpdateMarcaDto } from './dto/update-marca.dto';

@Controller('marcas')
export class MarcasController {
  constructor(private readonly marcasService: MarcasService) {}

  @Get() 
  findAll() {
    return this.marcasService.findAll();
  }
}
