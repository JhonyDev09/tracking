import { Unidade } from "src/unidades/entities/unidade.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Modelo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelo: string

    @OneToMany(()=> Unidade, (unidad)=> unidad.modelo)
    unidades: Unidade[];
}

