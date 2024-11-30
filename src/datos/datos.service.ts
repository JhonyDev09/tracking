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
      .innerJoinAndSelect('dato.empleado', 'empleado')
      .innerJoinAndSelect('dato.unidad', 'unidad')
      .select(['dato.imei', 'empleado.nombre', 'empleado.apellidos','empleado.numTel', 'unidad.placas', 'dato.latitud', 'dato.longitud'])
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


