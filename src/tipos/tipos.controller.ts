import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposService } from './tipos.service';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';

@Controller('tipos')
export class TiposController {
  constructor(private readonly tiposService: TiposService) {}

  @Get()
  findAll() {
    return this.tiposService.findAll();
  }
}
