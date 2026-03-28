import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";


export class CreateClienteDto {
    
        @IsString()
        @MaxLength(200)
        nombre : string;
         
        @IsString()
        @MaxLength(200)
        apellido : string;
        
        @IsNumber()
        @MaxLength(20)
        @IsOptional()
        celular? : number;
        
        @IsString()
        @IsOptional()
        @MaxLength(250)
        direccion? : string;
     
       @IsOptional()
        localidadId?: number;
        
}
