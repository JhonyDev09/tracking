import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';

@Entity()
export class Dato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  latitud: string;

  @Column()
  longitud: string;

  @Column()
  velocidad: number;

  @Column()
  combustible: number;

  @Column()
  fechahra: Date;

  @ManyToOne(() => Dispositivo, (dispositivo) => dispositivo.datos)
  dispositivo: Dispositivo;
}
