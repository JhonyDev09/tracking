import { Controller, Post, Body } from '@nestjs/common';
import { DatosService } from './datos.service';
import { CreateDatoDto } from './dto/create-dato.dto';

@Controller('/')
export class DatosController {
  constructor(private readonly datosService: DatosService) {}

  @Post()
  async create(@Body() createDatoDto: CreateDatoDto) {
    return await this.datosService.saveData(createDatoDto);
  }
}

