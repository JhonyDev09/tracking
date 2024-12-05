import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadoService {
  private readonly logger = new Logger(EmpleadoService.name)

  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>

  ){}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    try{
      const empleado = this.empleadoRepository.create(createEmpleadoDto);
      const empleadoGuardado = await this.empleadoRepository.save(empleado);
      const datosGuardados = JSON.stringify(empleadoGuardado);
      this.logger.log(`Empleado guardado exitosamente: ${datosGuardados}`);
      return empleadoGuardado;
    }catch(error){
      this.logger.log(error);
      throw new HttpException('Error al guardar el empleado', HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(): Promise<Empleado[]> {
    const empleadosConRol = await this.empleadoRepository
      .createQueryBuilder('empleado')
      .innerJoinAndSelect('empleado.rol', 'rol') 
      .select(['empleado', 'rol.rol'])
      .getMany();

    return empleadosConRol;
  
  }

  async findOne(id: number): Promise<Empleado[]>{
    const empleado = await this.empleadoRepository
    .createQueryBuilder('empleado')
    .innerJoinAndSelect('empleado.rol', 'rol') 
    .select(['empleado', 'rol.rol'])
    .where('empleado.id = :id', {id})
    .getMany();
    if(!empleado){
      this.logger.log(`Empleado con id: ${id} no encontrado`)
    }
    return empleado
   
  }

  async getAllChoferes(): Promise<Empleado[]>{
    const choferes = await this.empleadoRepository
    .createQueryBuilder('empleado')
    .where('empleado.rolId = :rolId', { rolId: 1 })
    .getMany();
    return choferes;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado[]> {
    try{
      const empleado = await this.findOne(id)
      if(!empleado){
        this.logger.log(`Empleado con id: ${id} no encontrado`);
      }
      await this.empleadoRepository.update(+id, updateEmpleadoDto);
      const datosActualizados = JSON.stringify(updateEmpleadoDto);
      this.logger.log(`Datos actualizados correctamente: ${datosActualizados}`);
      return this.findOne(id);
    }catch(error){
      this.logger.log(error);
      throw new HttpException('Error al actualizar el empleado', HttpStatus.BAD_REQUEST);
    }
  }

 async remove(id: number): Promise<void> {
    const empleado = await this.findOne(id);
    await this.empleadoRepository.remove(empleado);
    this.logger.log('Empleado elimindado')
  }

  
}
