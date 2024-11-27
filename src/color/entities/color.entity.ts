import { Unidade } from "src/unidades/entities/unidade.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Color {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    color: string;

    @Column()
    hexadecimal: string;

    @OneToMany(()=> Unidade, (unidad)=> unidad.color)
    unidades: Unidade[]
}
