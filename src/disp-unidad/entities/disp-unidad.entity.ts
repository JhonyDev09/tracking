import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { Unidade } from 'src/unidades/entities/unidade.entity';

@Entity()
export class DispUnidad {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Dispositivo, (dispositivo) => dispositivo.dispUnidad)
  dispositivo: Dispositivo;

  @ManyToOne(() => Unidade, (unidad) => unidad.dispUnidad)
  unidad: Unidade;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaAsig: Date;



}
