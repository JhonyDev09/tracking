import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColorService } from './color.service';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  findAll() {
    return this.colorService.findAll();
  }

}
