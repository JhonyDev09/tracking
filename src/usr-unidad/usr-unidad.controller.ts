import { Controller, Post, Delete, Body, HttpException, HttpStatus, Param, Get } from '@nestjs/common';
import { UsrUnidadService } from './usr-unidad.service';
import { CreateUsrUnidadDto } from './dto/create-usr-unidad.dto';

@Controller('chofer')
export class UsrUnidadController {
  constructor(private readonly usrunidadService: UsrUnidadService) {}

  // Endpoint para asignar un chofer a una unidad
  @Post('asignar')
  async asignarChofer(@Body() body: CreateUsrUnidadDto) {
    try {
      const resultado = await this.usrunidadService.asignarChofer(
        body.unidadId,
        body.choferId,
      );
      return resultado;
    } catch (error) {
      // Aquí se manejan los errores de asignación
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.response.message || 'Error al asignar chofer',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('listado')
  async obtenerAsignacionesConDetalles() {
    try {
      const asignaciones = await this.usrunidadService.getAsignacionesConDetalles();
      return asignaciones;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.response.message || 'Error al obtener asignaciones con detalles',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Endpoint para desasignar un chofer de una unidad
  @Delete('desasignar/:id')
  async desasignarChofer(@Param('id') id: number) {
    try {
      const resultado = await this.usrunidadService.desasignarChofer(id);
      return resultado;
    } catch (error) {
      // Aquí se manejan los errores de desasignación
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.response.message || 'Error al desasignar chofer',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
