import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";


export class CreateClienteDto {
    
        @IsString()
        @MaxLength(200)
        nombre : string;
         
        @IsString()
        @MaxLength(200)
        apellido : string;
        
        @IsString()
        @MaxLength(20)
        @IsOptional()
        celular? : string;
        
        @IsString()
        @IsOptional()
        @MaxLength(250)
        direccion? : string;
        
        @IsNumber()
        @IsOptional()
        localidadId?: number;
        
}
