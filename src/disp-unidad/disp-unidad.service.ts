import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DispUnidad } from './entities/disp-unidad.entity';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { Unidade } from 'src/unidades/entities/unidade.entity';

@Injectable()
export class DispUnidadService {
  constructor(
    @InjectRepository(DispUnidad)
    private readonly dispUnidadRepository: Repository<DispUnidad>,

    @InjectRepository(Dispositivo)
    private readonly dispositivoRepository: Repository<Dispositivo>,

    @InjectRepository(Unidade)
    private readonly unidadeRepository: Repository<Unidade>,
  ) {}

  /**
   * Asignar un dispositivo a una unidad.
   */
  async asignarDispositivo(
    dispositivoId: number,
    unidadId: number,
  ): Promise<DispUnidad> {
    try {
      const dispositivo = await this.dispositivoRepository.findOneBy({ id: dispositivoId });
      if (!dispositivo) {
        throw new NotFoundException('Dispositivo no encontrado');
      }

      const unidad = await this.unidadeRepository.findOneBy({ id: unidadId });
      if (!unidad) {
        throw new NotFoundException('Unidad no encontrada');
      }

      // Verificar si ya está asignado
      const existeAsignacion = await this.dispUnidadRepository.findOne({
        where: { dispositivo: { id: dispositivoId }, unidad: { id: unidadId } },
      });

      if (existeAsignacion) {
        throw new InternalServerErrorException('El dispositivo ya está asignado a esta unidad');
      }

      // Crear la asignación
      const nuevaAsignacion = this.dispUnidadRepository.create({
        dispositivo,
        unidad,
      });

      return await this.dispUnidadRepository.save(nuevaAsignacion);
    } catch (error) {
      // Manejo de errores
      throw new InternalServerErrorException(
        `Error al asignar dispositivo a la unidad: ${error.message}`,
      );
    }
  }

  /**
   * Desasignar un dispositivo de una unidad.
   */
  async desasignarDispositivo(id: number): Promise<string> {
    try {
      // Buscar la asignación de dispositivo a unidad por ID
      const asignacion = await this.dispUnidadRepository.findOne({
        where: { id },
      });

      // Si no se encuentra la asignación, lanzar un error
      if (!asignacion) {
        throw new NotFoundException(`Asignación con ID ${id} no encontrada.`);
      }

      // Eliminar la asignación
      await this.dispUnidadRepository.remove(asignacion);

      return `Dispositivo desasignado correctamente de la unidad.`;
    } catch (error) {
      // Manejo de errores
      throw error;
    }
  }
  
  async getAsignacionesConDetalles() {
    return await this.dispUnidadRepository
      .createQueryBuilder('dispunidad')
      .leftJoinAndSelect('dispunidad.unidad', 'unidad')
      .leftJoinAndSelect('unidad.status', 'status')
      .leftJoinAndSelect('unidad.marca', 'marca')
      .leftJoinAndSelect('unidad.modelo', 'modelo')
      .leftJoinAndSelect('dispunidad.dispositivo', 'dispositivo')
      .select([
        'dispunidad.id',
        'marca.marca',      // Marca de la unidad
        'modelo.modelo',     // Modelo de la unidad
        'unidad.placas',     // Placas de la unidad
        'status.estatus',    // Estatus de la unidad
        'dispositivo.nombre',  // Nombre del dispositivo
        'dispositivo.imei',    // IMEI del dispositivo
      ])
      .getMany();
  }
}
