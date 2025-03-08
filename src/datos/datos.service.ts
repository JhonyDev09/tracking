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

  async obtenerUltimosDatos(): Promise<any[]> {
    const ultimosDatos = await this.datoRepository
      .createQueryBuilder('dato')
      .innerJoinAndSelect('dato.dispositivo', 'dispositivo')
      .innerJoinAndSelect('dispositivo.dispunidad', 'dispunidad')
      .innerJoinAndSelect('dispunidad.unidad', 'unidad')
      .innerJoinAndSelect('unidad.usrunidad', 'usrunidad')
      .innerJoinAndSelect('usrunidad.chofer', 'empleado')
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
      .where(qb => {
        const subQuery = qb.subQuery()
          .select('MAX(dato.fechahra)')
          .from(Dato, 'dato')
          .where('dato.dispositivoId = dispositivo.id')
          .getQuery();
        return `dato.fechahra = ${subQuery}`;
      })
      .getRawMany();
  
    if (!ultimosDatos.length) {
      console.error('No se encontraron datos.');
      return [];
    }
  
    return ultimosDatos;
  }
}
