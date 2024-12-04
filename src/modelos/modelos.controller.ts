import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModelosService } from './modelos.service';


@Controller('modelos')
export class ModelosController {
  constructor(private readonly modelosService: ModelosService) {}

  @Get()
  findAll() {
    return this.modelosService.findAll();
  }

}
