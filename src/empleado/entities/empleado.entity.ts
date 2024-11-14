import { UsrUnidad } from "src/usr-unidad/entities/usr-unidad.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn,  } from "typeorm";


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
    nombreUser: string;

    @Column()
    contrasena: string;

    @Column()
    correo: string;

    @Column()
    rol: Rol;

    @OneToMany(() => UsrUnidad, (usrUnidad) => usrUnidad.chofer)
    usrunidad: UsrUnidad[];
}

export enum Rol {
    ADMIN = 'ADMIN',
    CHOFER = 'CHOFER',
    MONITORISTA = 'MONITORISTA'
}
