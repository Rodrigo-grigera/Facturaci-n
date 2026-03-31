import { IsInt, IsNumber, Min } from "class-validator";

export class PedidoProductoDto {
    @IsInt()
    id_pediProd : number;

    @IsInt()
    @Min(1)
    cantidad: number;

    @IsNumber()
    @Min(0)
    precioUnitario: number;
}
