import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Empleado } from './entities/empleado.entity';

@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}

  @Post()
  async create(@Body() createEmpleadoDto: CreateEmpleadoDto): Promise <Empleado> {
    try{
      const empleado = this.empleadoService.create(createEmpleadoDto);
      return empleado
    }catch (error){
      throw error;
    }
  }


  @Get()
  async findAll() {
    return this.empleadoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Empleado[]> {
    return this.empleadoService.findOne(+id);
  }

  @Patch(':id/edit')
  async update(@Param('id') id: string, @Body() updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado[]> {
    try{
      const empleado = await this.empleadoService.update(+id, updateEmpleadoDto)
      return empleado;         
    }catch(error){
      throw new HttpException('Error al actualizar el empleado', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    try{   
      return this.empleadoService.remove(+id);
    }catch (error){
      throw error;
    }
  }
}

