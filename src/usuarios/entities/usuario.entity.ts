import { UsrUnidad } from "src/usr-unidad/entities/usr-unidad.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn,  } from "typeorm";


@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: String;

    @Column()
    apellidos: String;

    @Column()
    numTel: String;

    @Column()
    nombreUser: String;

    @Column()
    contrasena: String;

    @Column()
    correo: String;

    @Column()
    rol: Rol;

    @OneToMany(() => UsrUnidad, (usrUnidad) => usrUnidad.chofer)
    usrUnidad: UsrUnidad[];
}

export enum Rol {
    ADMIN = 'ADMIN',
    CHOFER = 'CHOFER',
    MONITORISTA = 'MONITORISTA'
}


