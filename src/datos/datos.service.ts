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
    .innerJoinAndSelect('dato.dispositivo', 'dispositivo')       
    .innerJoinAndSelect('dispositivo.unidad', 'unidad')       
    .innerJoinAndSelect('unidad.dispunidad', 'dispunidad')          
    .innerJoinAndSelect('dispunidad.chofer', 'empleado')            
    .innerJoinAndSelect('unidad.usrunidad', 'usrunidad')            
    .innerJoinAndSelect('usrunidad.usuario', 'usuario')
    .select(['dispositivo.id AS id_dispositivo', 'dispositivo.numSerie AS numSerieDisp', 'dato.imei AS imei','dato.latitud AS latitud', 'dato.longitud AS longitud', 'unidad.placas AS placas', 'unidad.numSerie AS numSerie', 'empleado.nombre AS nombre', 'empleado.apellidos AS apellidos', 'empleado.numTel As numTel', 'dato.fechahra AS fechahra'])           
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


