import { Test, TestingModule } from '@nestjs/testing';
import { DispUnidadController } from './disp-unidad.controller';
import { DispUnidadService } from './disp-unidad.service';

describe('DispUnidadController', () => {
  let controller: DispUnidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispUnidadController],
      providers: [DispUnidadService],
    }).compile();

    controller = module.get<DispUnidadController>(DispUnidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
