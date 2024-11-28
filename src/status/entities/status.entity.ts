import { Unidade } from "src/unidades/entities/unidade.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('status')
export class Status {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    status: string;

    @OneToMany(()=> Unidade, (unidad)=> unidad.status)
    unidades: Unidade[];
}
