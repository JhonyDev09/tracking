import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUnidadeDto {
  @IsNotEmpty()
  @IsString()
  numSerie: string;

  @IsNotEmpty()
  @IsNumber()
  marcaId: number;

  @IsNotEmpty()
  @IsNumber()
  modeloId: number;

  @IsNotEmpty() 
  @IsNumber()
  colorId: number;

  @IsNotEmpty()
  @IsString()
  ano: string;

  @IsNotEmpty()
  @IsString()
  placas: string;

  @IsNotEmpty()
  @IsNumber()
  tipoId: number;

  @IsNotEmpty()
  @IsNumber()
  estatusId: number;

  @IsNotEmpty()
  @IsString()
  descripcion: string;
}
