import { IsString, MaxLength } from "class-validator";

export class CreateLocalidadDto {
    @IsString()
    @MaxLength(250)
    nombre: string;
}
