import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Unidade } from 'src/unidades/entities/unidade.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity('usrUnidad')
export class UsrUnidad {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Unidade, (unidad) => unidad.usrUnidad)
  unidad: Unidade;

  @ManyToOne(() => Usuario, (empleado) => empleado.usrUnidad)
  chofer: Usuario;
}
