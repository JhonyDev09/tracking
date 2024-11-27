import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolService } from './rol.service';


@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}


  @Get()
  findAll() {
    return this.rolService.findAll();
  }


}
