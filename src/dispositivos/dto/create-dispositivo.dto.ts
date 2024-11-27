import { IsNotEmpty, IsString } from "class-validator";

export class CreateDispositivoDto {

    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    imei: string;

    @IsNotEmpty()
    @IsString()
    numTel: string;

    @IsNotEmpty()
    @IsString()
    icc: string;
    
    @IsNotEmpty()
    @IsString()
    numSerie: string;

}
