import { Rol } from "src/rol/entities/rol.entity";
import { UsrUnidad } from "src/usr-unidad/entities/usr-unidad.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,  } from "typeorm";


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
    @JoinColumn({ name: 'rolId' })  // Esto le dice a TypeORM que la columna que representa la relación se llama 'rolId'
    rol: Rol;

    @Column()
    rolId: number;

    @OneToMany(() => UsrUnidad, (usrUnidad) => usrUnidad.chofer)
    usrunidad: UsrUnidad[];
}
