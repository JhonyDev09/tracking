import { Injectable } from '@nestjs/common';
import { CreateDispUnidadDto } from './dto/create-disp-unidad.dto';
import { UpdateDispUnidadDto } from './dto/update-disp-unidad.dto';

@Injectable()
export class DispUnidadService {
  create(createDispUnidadDto: CreateDispUnidadDto) {
    return 'This action adds a new dispUnidad';
  }

  findAll() {
    return `This action returns all dispUnidad`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dispUnidad`;
  }

  update(id: number, updateDispUnidadDto: UpdateDispUnidadDto) {
    return `This action updates a #${id} dispUnidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} dispUnidad`;
  }
}
