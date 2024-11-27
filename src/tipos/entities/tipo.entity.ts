import { Unidade } from "src/unidades/entities/unidade.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tipo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: string;

    @OneToMany(()=> Unidade, (unidad)=> unidad.tipo)
    unidades: Unidade[];
}
