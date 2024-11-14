import { Test, TestingModule } from '@nestjs/testing';
import { UbicacionesGateway } from './ubicaciones.gateway';

describe('UbicacionesGateway', () => {
  let gateway: UbicacionesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UbicacionesGateway],
    }).compile();

    gateway = module.get<UbicacionesGateway>(UbicacionesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
