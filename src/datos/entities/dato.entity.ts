import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Dispositivo } from 'src/dispositivos/entities/dispositivo.entity';

@Entity()
export class Dato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  latitud: string;

  @Column({ type: 'varchar', length: 100 })
  longitud: string;

  @Column()
  fechahra: Date;

  @Column()
  velocidad: number;

  @Column()
  aceite: number;

  @ManyToOne(() => Dispositivo, dispositivo => dispositivo.datos)
  dispositivo: Dispositivo;

  @JoinColumn({ name: 'dispositivoId' })
  dispositivoId: number;  
}
