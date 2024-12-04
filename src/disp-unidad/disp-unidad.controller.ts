import { Controller, Post, Delete, Body, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { DispUnidadService } from './disp-unidad.service';
import { CreateDispUnidadDto } from './dto/create-disp-unidad.dto';
@Controller('asignaciones')
export class DispUnidadController {
  constructor(private readonly dispUnidadService: DispUnidadService) {}

  /**
   * Endpoint para asignar un dispositivo a una unidad.
   */
  @Post('dispositivo')
  async asignarDispositivo(
    @Body() body: CreateDispUnidadDto,
  ) {
    try {
      const resultado = await this.dispUnidadService.asignarDispositivo(
        body.dispositivoId,
        body.unidadId,
      );
      return resultado;
    } catch (error) {
      // Aquí se manejan los errores de asignación
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.response.message || 'Error al asignar dispositivo',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }



  /**
   * Endpoint para listar asignaciones.
   */

  @Get('listado')
  async getAsignaciones() {
    return await this.dispUnidadService.getAsignacionesConDetalles();
  }




  /**
   * Endpoint para desasignar un dispositivo de una unidad.
   */
  @Delete('desasignar/:id')
  async desasignar(@Param('id') id: number): Promise<string> {
    return this.dispUnidadService.desasignarDispositivo(id);
  }
}
