import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';
import { Unidade } from './entities/unidade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UnidadesService {

  private readonly logger = new Logger(UnidadesService.name);

  constructor(
    @InjectRepository(Unidade)
    private  unidadRepository: Repository<Unidade>
  ){}
  
  async create(createUnidadeDto: CreateUnidadeDto): Promise<Unidade>{
    try{
      const unidad = this.unidadRepository.create(createUnidadeDto);
      const data = JSON.stringify(unidad);
      this.logger.log(data);
      const unidadGuardada = await this.unidadRepository.save(unidad);
      const datosGuardados = JSON.stringify(unidadGuardada);
      this.logger.log(`Datos guardados correctamente: ${datosGuardados}`);
      return unidadGuardada;
    }catch(error){
      this.logger.log(error)
      throw new HttpException('Error al guardar la unidad', HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(): Promise<Unidade[]> {
   const unidades = await this.unidadRepository
   .createQueryBuilder('unidad')
   .innerJoinAndSelect('unidad.marca', 'marca')
   .innerJoinAndSelect('unidad.modelo', 'modelo')
   .innerJoinAndSelect('unidad.color', 'color')
   .innerJoinAndSelect('unidad.tipo', 'tipo')
   .innerJoinAndSelect('unidad.status', 'status')
   .select(['unidad.id', 'unidad.numSerie', 'unidad.ano', 'unidad.placas', 'unidad.descripcion', 'marca.marca', 'modelo.modelo', 'color.color', 'tipo.tipo', 'status.estatus' ])
   .getMany()

   return unidades;
  }

  async findOne(id: number): Promise<Unidade[]> {
    try{
      const unidad = this.unidadRepository
      .createQueryBuilder('unidad')
      .innerJoinAndSelect('unidad.marca', 'marca')
      .innerJoinAndSelect('unidad.modelo', 'modelo')
      .innerJoinAndSelect('unidad.color', 'color')
      .innerJoinAndSelect('unidad.tipo', 'tipo')
      .innerJoinAndSelect('unidad.status', 'status')
      .select(['unidad.id', 'unidad.numSerie', 'unidad.ano', 'unidad.placas', 'unidad.descripcion', 'marca.marca', 'modelo.modelo', 'color.color', 'tipo.tipo', 'status.estatus' ])
      .where('unidad.id = :id', {id})
      .getMany()
      if(!unidad){
        this.logger.log(`El dato con el id: ${id} no existe`)
      }
      return unidad
    }catch(error){
      throw new HttpException("Error al obtener los datos", HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateUnidadeDto: UpdateUnidadeDto): Promise<Unidade[]> {
    try{
      const unidad = await this.findOne(+id);
      if(!unidad){
        this.logger.log(`No existen datos con el id: ${id}`)
      }
      await this.unidadRepository.update(+id, updateUnidadeDto);
      const datosActualizados = JSON.stringify(updateUnidadeDto);
      this.logger.log(`Datos actualizados con el id: ${id} datos actualizados ${datosActualizados}`);
      return this.findOne(+id)
    }catch(error){
      this.logger.error(`Error al actualizar los datos con ID ${id}. Detalles: ${error.message}`,error.stack);
      throw new HttpException("Error al actualizar los datos", HttpStatus.BAD_REQUEST);
    }  
  }

  async remove(id: number): Promise<void> {
    const unidad = await this.findOne(id);
    await this.unidadRepository.remove(unidad);
    this.logger.log('unidad elimindado');
  }
}
