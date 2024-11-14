import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Unidade } from 'src/unidades/entities/unidade.entity';
import { Empleado } from 'src/empleado/entities/empleado.entity';

@Entity()
export class UsrUnidad {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Unidade, (unidad) => unidad.usrUnidad)
  unidad: Unidade;

  @ManyToOne(() => Empleado, (empleado) => empleado.usrUnidad)
  chofer: Empleado;

  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaAsig: Date;

  
}
