import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispositivo } from './entities/dispositivo.entity';
import { Repository } from 'typeorm';
import { CreateDispositivoDto } from './dto/create-dispositivo.dto';
import { UpdateDispositivoDto } from './dto/update-dispositivo.dto';



@Injectable()
export class DispositivosService {
  private readonly logger = new Logger(DispositivosService.name)
  constructor(
    @InjectRepository(Dispositivo)
    private dispositivosRepository: Repository<Dispositivo>,
  ){}

  async create(
    createDispositivoDto: CreateDispositivoDto
  ): Promise<Dispositivo> {
    try {
      const dispositivo = this.dispositivosRepository.create(createDispositivoDto);
      const dispositivoGuardado = await this.dispositivosRepository.save(dispositivo);
      const datosGuardados = JSON.stringify(dispositivoGuardado);
      this.logger.log(`Dispositivo creado con éxito. Datos: ${datosGuardados}`);
      return dispositivoGuardado;
    } catch (error) {
      throw new HttpException('Error al crear el dispositivo', HttpStatus.BAD_REQUEST);
    }
  }
  
  async findAll(): Promise<Dispositivo[]>{
    return this.dispositivosRepository.find();
  }

  async findOne(id: number): Promise<Dispositivo>{
    const dispositivo = await this.dispositivosRepository.findOne({
      where: {id}
    });
    if (!dispositivo){
      this.logger.error(`Dispositivo con id: ${id} no encontrado`)
    }
    return dispositivo;
  }

  async update(
    id: number,
    updateDispositivoDto: UpdateDispositivoDto
  ): Promise<Dispositivo> {
    try {
      const dispositivo = await this.findOne(id);
      if (!dispositivo) {
        this.logger.error(`Dispositivo con id: ${id} no encontrado`)
      }
      await this.dispositivosRepository.update(id, updateDispositivoDto);
      const datosActualizados = JSON.stringify(updateDispositivoDto);
      this.logger.log(`Dispositivo con ID ${id} actualizado con éxito. Datos: ${datosActualizados}`);
      return this.findOne(id);
    } catch (error) {
      this.logger.error(`Error al actualizar el dispositivo con ID ${id}. Detalles: ${error.message}`,error.stack);
      throw error;
    }
  }
  
  async remove(id: number): Promise<void>{
    const dispositivo = await this.findOne(id);
    await this.dispositivosRepository.remove(dispositivo);
    this.logger.log('Dispositivo elimindado')
  }

}
