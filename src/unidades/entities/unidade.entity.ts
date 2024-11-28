import { Color } from "src/color/entities/color.entity";
import { DispUnidad } from "src/disp-unidad/entities/disp-unidad.entity";
import { Marca } from "src/marcas/entities/marca.entity";
import { Modelo } from "src/modelos/entities/modelo.entity";
import { Status } from "src/status/entities/status.entity";
import { Tipo } from "src/tipos/entities/tipo.entity";
import { UsrUnidad } from "src/usr-unidad/entities/usr-unidad.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('unidad')
export class Unidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numSerie: string;

  @Column() // Declara explicitamente marcaId
  marcaId: number;

  @ManyToOne(() => Marca, (marca) => marca.unidades)
  @JoinColumn({ name: 'marcaId' })
  marca: Marca;

  @Column() // Declara explicitamente modeloId
  modeloId: number;

  @ManyToOne(() => Modelo, (modelo) => modelo.unidades)
  @JoinColumn({ name: 'modeloId' })
  modelo: Modelo;

  @Column() // Declara explicitamente colorId
  colorId: number;

  @ManyToOne(() => Color, (color) => color.unidades)
  @JoinColumn({ name: 'colorId' })
  color: Color;

  @Column()
  ano: string

  @Column()
  placas: string;

  @Column() // Declara explicitamente tipoId
  tipoId: number;

  @ManyToOne(() => Tipo, (tipo) => tipo.unidades)
  @JoinColumn({ name: 'tipoId' })
  tipo: Tipo;

  @Column() // Declara explicitamente estatusId
  estatusId: number;

  @ManyToOne(() => Status, (status) => status.unidades)
  @JoinColumn({ name: 'estatusId' })
  status: Status;

  @Column()
  descripcion: string;

  @OneToMany(() => DispUnidad, (dispUnidad) => dispUnidad.unidad)
  dispunidad: DispUnidad[];

  @OneToMany(() => UsrUnidad, (usrUnidad) => usrUnidad.unidad)
  usrunidad: UsrUnidad[];
}
