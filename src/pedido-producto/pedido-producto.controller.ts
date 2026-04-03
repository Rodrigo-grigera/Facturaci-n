import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidoProductoService } from './pedido-producto.service'
import { UpdatePedidoProductoDto } from './dto/update-pedido-producto.dto';

@Controller('pedido-producto')
export class PedidoProductoController {
  constructor(private readonly pedidoProductoService: PedidoProductoService) {}


  @Get()
  findAll() {
    return this.pedidoProductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoProductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoProductoDto: UpdatePedidoProductoDto) {
    return this.pedidoProductoService.update(+id, updatePedidoProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoProductoService.remove(+id);
  }
}
