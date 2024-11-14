import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { Unidade } from 'src/unidades/entities/unidade.entity';

@Entity('dispUnidad')
export class DispUnidad {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Dispositivo, (dispositivo) => dispositivo.dispUnidad)
  dispositivo: Dispositivo;

  @ManyToOne(() => Unidade, (unidad) => unidad.dispUnidad)
  unidad: Unidade;
}
