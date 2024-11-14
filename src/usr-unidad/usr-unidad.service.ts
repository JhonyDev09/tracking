import { Injectable } from '@nestjs/common';
import { CreateUsrUnidadDto } from './dto/create-usr-unidad.dto';
import { UpdateUsrUnidadDto } from './dto/update-usr-unidad.dto';

@Injectable()
export class UsrUnidadService {
  create(createUsrUnidadDto: CreateUsrUnidadDto) {
    return 'This action adds a new usrUnidad';
  }

  findAll() {
    return `This action returns all usrUnidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usrUnidad`;
  }

  update(id: number, updateUsrUnidadDto: UpdateUsrUnidadDto) {
    return `This action updates a #${id} usrUnidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} usrUnidad`;
  }
}
