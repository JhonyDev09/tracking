import { Dato } from "src/datos/entities/dato.entity";
import { DispUnidad } from "src/disp-unidad/entities/disp-unidad.entity";
import { Unidade } from "src/unidades/entities/unidade.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('dispositivo')
export class Dispositivo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    nombre: string;

    @Column({length: 50})
    imei: string;

    @Column({length: 20})
    numTel: string;

    @Column({length: 25})
    icc: string;

    @Column({length: 50})
    numSerie: string;

    @OneToMany (()=> Dato, (dato) => dato.dispositivo)
    datos: Dato[]

    @OneToMany(() => DispUnidad, (dispUnidad) => dispUnidad.dispositivo)
    dispunidad: DispUnidad[];

}
