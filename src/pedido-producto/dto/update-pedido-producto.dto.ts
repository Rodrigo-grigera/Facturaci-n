import { PartialType } from '@nestjs/mapped-types';
import { PedidoProductoDto } from './create-pedido-producto.dto';

export class UpdatePedidoProductoDto extends PartialType(PedidoProductoDto) {}
