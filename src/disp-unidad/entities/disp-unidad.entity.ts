import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';
import { Unidade } from 'src/unidades/entities/unidade.entity';

@Entity()
export class DispUnidad {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Dispositivo, (dispositivo) => dispositivo.dispunidad)
  dispositivo: Dispositivo;

  @ManyToOne(() => Unidade, (unidad) => unidad.dispunidad)
  unidad: Unidade;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaAsig: Date;



}
