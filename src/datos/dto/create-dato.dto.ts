import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateDatoDto {
  @IsNotEmpty()
  @IsString()
  imei: string;

  @IsNotEmpty()
  @IsString()
  latitud: string;

  @IsNotEmpty()
  @IsString()
  longitud: string;

  @IsNotEmpty()
  @IsNumber()
  velocidad: number;

  @IsNotEmpty()
  @IsNumber()
  combustible: number;

  @IsNotEmpty()
  fechahra: Date;
}
