import { IsInt, IsPositive } from "class-validator";

export class CreateDispUnidadDto {

    @IsInt()
    @IsPositive()
    dispositivoId: number;
  
    @IsInt()
    @IsPositive()
    unidadId: number;
}
