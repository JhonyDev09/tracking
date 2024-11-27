import { Color } from "src/color/entities/color.entity";
import { DispUnidad } from "src/disp-unidad/entities/disp-unidad.entity";
import { Marca } from "src/marcas/entities/marca.entity";
import { Modelo } from "src/modelos/entities/modelo.entity";
import { Status } from "src/status/entities/status.entity";
import { Tipo } from "src/tipos/entities/tipo.entity";
import { UsrUnidad } from "src/usr-unidad/entities/usr-unidad.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Unidade {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    numSerie: string;

    @ManyToOne(() => Marca, (marca) => marca.unidades)
    marca: Marca;

    @ManyToOne (()=> Modelo, (modelo)=> modelo.unidades)
    modelo: Modelo;

    @ManyToOne (()=> Color, (color)=> color.unidades)
    color: Color;

    @Column()
    placas: number;

    @ManyToOne(()=> Tipo, (tipo)=> tipo.unidades)
    tipo: Tipo;

    @ManyToOne(()=> Status, (status)=> status.unidades)
    status: Status;

    @Column()
    descripcion: string;

    @OneToMany(() => DispUnidad, (dispUnidad) => dispUnidad.unidad)
    dispunidad: DispUnidad[];

    @OneToMany(() => UsrUnidad, (usrUnidad) => usrUnidad.unidad)
    usrunidad: UsrUnidad[];

}
