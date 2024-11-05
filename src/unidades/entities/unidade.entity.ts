import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Unidade {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    numSerie: string;

    @Column()
    nombre: string;

    

}
