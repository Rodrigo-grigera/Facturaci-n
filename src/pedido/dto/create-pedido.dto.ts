import { Type } from "class-transformer";
import { IsArray, IsInt, ValidateNested } from "class-validator";
import { PedidoProductoDto } from "../../pedido-producto/dto/create-pedido-producto.dto";

export class CreatePedidoDto {

    @IsInt()
    clienteId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PedidoProductoDto)
    productos: PedidoProductoDto[];
}
