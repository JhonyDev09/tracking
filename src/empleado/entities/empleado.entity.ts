import { Rol } from "src/rol/entities/rol.entity";
import { UsrUnidad } from "src/usr-unidad/entities/usr-unidad.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,  } from "typeorm";


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
    correo: string;

    @ManyToOne(() => Rol, (rol) => rol.empleados)
    rol: Rol;

    @OneToMany(() => UsrUnidad, (usrUnidad) => usrUnidad.chofer)
    usrunidad: UsrUnidad[];
}
