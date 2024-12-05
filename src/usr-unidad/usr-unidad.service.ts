import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsrUnidad } from './entities/usr-unidad.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';
import { Unidade } from 'src/unidades/entities/unidade.entity';

@Injectable()
export class UsrUnidadService {
  constructor(
    @InjectRepository(UsrUnidad)
    private usrunidadRepository: Repository<UsrUnidad>, // Repositorio de UsrUnidad
    @InjectRepository(Empleado)
    private empleadoRepository: Repository<Empleado>, // Repositorio de Empleado
    @InjectRepository(Unidade)
    private unidadeRepository: Repository<Unidade>, // Repositorio de Unidade
  ) {}

  /**
   * Método para asignar un chofer a una unidad.
   */
  async asignarChofer(unidadId: number, choferId: number): Promise<string> {
    try {
      console.log('Datos recibidos para asignación:', { unidadId, choferId });

      // Buscar la unidad
      const unidad = await this.unidadeRepository.findOne({ where: { id: unidadId } });
      if (!unidad) {
        console.error(`Unidad con ID ${unidadId} no encontrada.`);
        throw new NotFoundException(`Unidad con ID ${unidadId} no encontrada.`);
      }

      // Buscar el chofer
      const chofer = await this.empleadoRepository.findOne({ where: { id: choferId } });
      if (!chofer) {
        console.error(`Chofer con ID ${choferId} no encontrado.`);
        throw new NotFoundException(`Chofer con ID ${choferId} no encontrado.`);
      }

      // Validar si ya existe una asignación de este chofer a esta unidad
      const existingAssignment = await this.usrunidadRepository.findOne({
        where: { unidad: { id: unidadId }, chofer: { id: choferId } },
      });
      if (existingAssignment) {
        console.error(`El chofer con ID ${choferId} ya está asignado a la unidad con ID ${unidadId}.`);
        throw new ConflictException(`El chofer ya está asignado a esta unidad.`);
      }

      // Validar si la unidad ya tiene un chofer asignado
      const choferAsignado = await this.usrunidadRepository.findOne({
        where: { unidad: { id: unidadId } },
      });
      if (choferAsignado) {
        console.error(`La unidad con ID ${unidadId} ya tiene un chofer asignado.`);
        throw new ConflictException(`La unidad ya tiene un chofer asignado.`);
      }

      // Validar si el chofer ya tiene un vehículo asignado
      const vehiculoAsignado = await this.usrunidadRepository.findOne({
        where: { chofer: { id: choferId } },
      });
      if (vehiculoAsignado) {
        console.error(`El chofer con ID ${choferId} ya tiene un vehículo asignado.`);
        throw new ConflictException(`El chofer ya tiene un vehículo asignado.`);
      }

      // Crear la nueva asignación
      const newAssignment = this.usrunidadRepository.create({
        unidad,
        chofer,
        fechaAsig: new Date(),
      });

      // Guardar en la base de datos
      await this.usrunidadRepository.save(newAssignment);
      console.log(`Chofer con ID ${choferId} asignado correctamente a la unidad con ID ${unidadId}.`);
      return `Chofer asignado correctamente a la unidad.`;
    } catch (error) {
      console.error('Error al asignar chofer a unidad:', error);
      throw new InternalServerErrorException(error.message || 'Error al asignar chofer a la unidad.');
    }
  }

  /**
   * Método para desasignar un chofer de una unidad.
   */
  async desasignarChofer(id: number): Promise<string> {
    try {
      console.log('ID de la asignación a desasignar:', id);

      // Buscar la asignación por el ID
      const asignacion = await this.usrunidadRepository.findOne({ where: { id } });
      if (!asignacion) {
        console.error(`Asignación con ID ${id} no encontrada.`);
        throw new NotFoundException(`Asignación con ID ${id} no encontrada.`);
      }

      // Eliminar la asignación
      await this.usrunidadRepository.remove(asignacion);
      console.log(`Asignación con ID ${id} eliminada correctamente.`);
      return `Chofer desasignado correctamente de la unidad.`;
    } catch (error) {
      console.error('Error al desasignar chofer de unidad:', error);
      throw new InternalServerErrorException(error.message || 'Error al desasignar chofer de la unidad.');
    }
  }

  /**
   * Método para obtener asignaciones con detalles.
   */
  async getAsignacionesConDetalles() {
    try {
      console.log('Obteniendo asignaciones con detalles...');
      const asignaciones = await this.usrunidadRepository
        .createQueryBuilder('usrunidad')
        .leftJoinAndSelect('usrunidad.unidad', 'unidad') // Unidades asociadas
        .leftJoinAndSelect('unidad.status', 'status')
        .leftJoinAndSelect('unidad.marca', 'marca')
        .leftJoinAndSelect('unidad.modelo', 'modelo')
        .leftJoinAndSelect('usrunidad.chofer', 'chofer') // Choferes asociados
        .select([
          'usrunidad.id',
          'marca.marca', // Marca de la unidad
          'modelo.modelo', // Modelo de la unidad
          'unidad.placas', // Placas de la unidad
          'status.estatus', // Estatus de la unidad
          'chofer.nombre', // Nombre del chofer
          'chofer.apellidos', // Apellidos del chofer
          'chofer.numTel', // Número de teléfono del chofer
        ])
        .getMany();

      console.log('Asignaciones obtenidas:', asignaciones);
      return asignaciones;
    } catch (error) {
      console.error('Error al obtener asignaciones con detalles:', error);
      throw new InternalServerErrorException('Error al obtener asignaciones con detalles.');
    }
  }
}
