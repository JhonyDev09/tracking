import { Empleado } from "src/empleado/entities/empleado.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rol {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    rol: string;

    @OneToMany(() => Empleado, (empleado) => empleado.rol)
    empleados: Empleado[];
}
