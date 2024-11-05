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

    //@OneToMany(() => Unidades, (unidad)=>unidad.chofer)
    //unidades: Unidad[];
}

export enum Rol {
    ADMIN = 'ADMIN',
    CHOFER = 'CHOFER',
    MONITORISTA = 'MONITORISTA'
}


