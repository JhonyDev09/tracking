import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dato } from './entities/dato.entity';

@Injectable()
export class DatosService {
  constructor(
    @InjectRepository(Dato)
    private readonly datoRepository: Repository<Dato>,  // Inyecta el repositorio de Dato
  ) { }

  async create(dato: any) {
    const nuevoDato = this.datoRepository.create(dato);
    return await this.datoRepository.save(nuevoDato);
  }

  async obtenerUltimoDato(): Promise<any> {
    const ultimoDato = await this.datoRepository
    .createQueryBuilder('dato')
    .innerJoinAndSelect('dato.dispositivo', 'dispositivo')       // Relación con Dispositivo
    .innerJoinAndSelect('dispositivo.dispunidad', 'dispunidad')   // Relación con DispUnidad
    .innerJoinAndSelect('dispunidad.unidad', 'unidad')           // Relación con Unidad
    .innerJoinAndSelect('unidad.usrunidad', 'usrunidad')         // Relación con UsrUnidad
    .innerJoinAndSelect('usrunidad.chofer', 'empleado')        // Relación con Empleado
    .select([
      'dispositivo.id AS id_dispositivo',
      'dispositivo.numSerie AS numSerieDisp',
      'dispositivo.nombre AS nombreDisp',
      'dispositivo.imei AS imei',
      'dato.latitud AS latitud',
      'dato.longitud AS longitud',
      'unidad.placas AS placas',
      'unidad.numSerie AS numSerie',
      'empleado.nombre AS nombre',
      'empleado.apellidos AS apellidos',
      'empleado.numTel AS numTel',
      'dato.fechahra AS fechahra'
    ])
    .orderBy('dato.fechahra', 'DESC')
    .limit(1)
    .getRawOne();

    if (!ultimoDato) {
      console.error('No se encontró el último dato.');
      return null;
    }

    return ultimoDato;
  }


}


