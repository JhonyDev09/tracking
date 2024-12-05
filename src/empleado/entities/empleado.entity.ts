import { Rol } from "src/rol/entities/rol.entity";
import { UsrUnidad } from "src/usr-unidad/entities/usr-unidad.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;  // Número fijo de rondas para el salt

@Entity('empleado')
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellidos: string;

  @Column()
  numTel: string;

  @Column()
  nombreUsuario: string;

  @Column()
  contrasena: string;

  @Column()
  email: string;

  @ManyToOne(() => Rol, (rol) => rol.empleados)
  @JoinColumn({ name: 'rolId' })
  rol: Rol;

  @Column()
  rolId: number;

  @OneToMany(() => UsrUnidad, (usrUnidad) => usrUnidad.chofer)
  usrunidad: UsrUnidad[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.contrasena) {
      // Usa el número fijo de rondas al generar el salt
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      this.contrasena = await bcrypt.hash(this.contrasena, salt);
    }
  }
}
