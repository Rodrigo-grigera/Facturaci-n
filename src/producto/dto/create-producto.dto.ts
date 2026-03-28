import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";



export class CreateProductoDto {
    @IsString()
    @MaxLength(250)
    nombre : string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    descripcion : string

    @IsNumber()
    precio : number;
    
    @IsBoolean()
    @IsOptional()
    disponible ? : boolean;
    
    @IsInt()
    @Min(0)
    stock: number;

}
