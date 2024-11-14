import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dato } from './entities/dato.entity';

@Injectable()
export class DatosService {
  constructor(
    @InjectRepository(Dato)
    private readonly datoRepository: Repository<Dato>,  // Inyecta el repositorio de Dato
  ) {}

  async create(dato: any) {
    const nuevoDato = this.datoRepository.create(dato);
    return await this.datoRepository.save(nuevoDato);
  }

  async obtenerUltimoDato(): Promise<any> {
    const ultimoDato = await this.datoRepository
      .createQueryBuilder('d')
      .select([
        'disp.imei AS imei',
        'd.latitud AS latitud',
        'd.longitud AS longitud',
        'u.placas AS placas',
        'u.numSerie AS numSerie',
        'e.nombre AS nombre',
        'e.apellidos AS apellidos',
        'e.numTel AS numTel',
        'd.fechahra AS fechahra',
      ])
      .innerJoin('d.dispositivo', 'disp')
      .innerJoin('disp.dispUnidad', 'du')
      .innerJoin('du.unidad', 'u')
      .innerJoin('u.usrUnidad', 'uu')
      .innerJoin('uu.empleado', 'e')
      .orderBy('d.fechahra', 'DESC')
      .limit(1)
      .getRawOne();

    if (!ultimoDato) {
      console.error('No se encontró el último dato.');
      return null;
    }

    return ultimoDato;
  }
  

}


