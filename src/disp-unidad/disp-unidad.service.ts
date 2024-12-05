import { Injectable, NotFoundException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DispUnidad } from './entities/disp-unidad.entity';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { Unidade } from 'src/unidades/entities/unidade.entity';

@Injectable()
export class DispUnidadService {
  private readonly logger = new Logger(DispUnidadService.name); // Inicializamos el logger

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
    this.logger.log(`AsignarDispositivo - Datos recibidos: dispositivoId=${dispositivoId}, unidadId=${unidadId}`);
    
    try {
      const dispositivo = await this.dispositivoRepository.findOneBy({ id: dispositivoId });
      if (!dispositivo) {
        this.logger.warn(`Dispositivo con ID ${dispositivoId} no encontrado`);
        throw new NotFoundException('Dispositivo no encontrado');
      }

      const unidad = await this.unidadeRepository.findOneBy({ id: unidadId });
      if (!unidad) {
        this.logger.warn(`Unidad con ID ${unidadId} no encontrada`);
        throw new NotFoundException('Unidad no encontrada');
      }

      // Verificar si el dispositivo ya está asignado a otra unidad
      const dispositivoAsignado = await this.dispUnidadRepository.findOne({
        where: { dispositivo: { id: dispositivoId } },
      });

      if (dispositivoAsignado) {
        this.logger.error(`El dispositivo con ID ${dispositivoId} ya está asignado a otra unidad`);
        throw new InternalServerErrorException(
          'El dispositivo ya está asignado a otra unidad',
        );
      }

      // Verificar si la unidad ya tiene un dispositivo asignado
      const unidadAsignada = await this.dispUnidadRepository.findOne({
        where: { unidad: { id: unidadId } },
      });

      if (unidadAsignada) {
        this.logger.error(`La unidad con ID ${unidadId} ya tiene un dispositivo asignado`);
        throw new InternalServerErrorException(
          'La unidad ya tiene un dispositivo asignado',
        );
      }

      // Crear la asignación si pasa las validaciones
      const nuevaAsignacion = this.dispUnidadRepository.create({
        dispositivo,
        unidad,
        fechaAsig: new Date(),
      });

      const result = await this.dispUnidadRepository.save(nuevaAsignacion);
      this.logger.log(`Asignación creada con éxito: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error al asignar dispositivo a la unidad: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        `Error al asignar dispositivo a la unidad: ${error.message}`,
      );
    }
  }

  /**
   * Desasignar un dispositivo de una unidad.
   */
  async desasignarDispositivo(id: number): Promise<string> {
    this.logger.log(`DesasignarDispositivo - ID recibido: ${id}`);
    
    try {
      const asignacion = await this.dispUnidadRepository.findOne({
        where: { id },
      });

      if (!asignacion) {
        this.logger.warn(`Asignación con ID ${id} no encontrada.`);
        throw new NotFoundException(`Asignación con ID ${id} no encontrada.`);
      }

      await this.dispUnidadRepository.remove(asignacion);

      this.logger.log(`Dispositivo desasignado correctamente de la unidad con ID ${id}`);
      return `Dispositivo desasignado correctamente de la unidad.`;
    } catch (error) {
      this.logger.error(`Error al desasignar dispositivo: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Obtener asignaciones con detalles.
   */
  async getAsignacionesConDetalles() {
    this.logger.log('Obteniendo asignaciones con detalles');

    try {
      const result = await this.dispUnidadRepository
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

      this.logger.log(`Asignaciones obtenidas: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(`Error al obtener asignaciones con detalles: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Error al obtener asignaciones con detalles');
    }
  }
}
