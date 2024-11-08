import { Controller, Post, Body } from '@nestjs/common';
import { DatosService } from './datos.service';


@Controller('/')
export class DatosController {
  constructor(private readonly datosService: DatosService) {}

 
}

