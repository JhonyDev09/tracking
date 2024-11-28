import { Unidade } from "src/unidades/entities/unidade.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Marca {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    marca: string;

    @OneToMany(()=> Unidade, (unidad)=> unidad.marca)
    unidades: Unidade[];
}
