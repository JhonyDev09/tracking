import { DispUnidad } from "src/disp-unidad/entities/disp-unidad.entity";
import { UsrUnidad } from "src/usr-unidad/entities/usr-unidad.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Unidade {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    numSerie: string;

    @Column()
    nombre: string;

    @OneToMany(() => DispUnidad, (dispUnidad) => dispUnidad.unidad)
    dispUnidad: DispUnidad[];

    @OneToMany(() => UsrUnidad, (usrUnidad) => usrUnidad.unidad)
    usrUnidad: UsrUnidad[];

}
