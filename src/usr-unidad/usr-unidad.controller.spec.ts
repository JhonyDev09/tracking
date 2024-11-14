import { Test, TestingModule } from '@nestjs/testing';
import { UsrUnidadController } from './usr-unidad.controller';
import { UsrUnidadService } from './usr-unidad.service';

describe('UsrUnidadController', () => {
  let controller: UsrUnidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsrUnidadController],
      providers: [UsrUnidadService],
    }).compile();

    controller = module.get<UsrUnidadController>(UsrUnidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
