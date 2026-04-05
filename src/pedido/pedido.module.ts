import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { ProductoModule } from '.././producto/producto.module';
import { ClienteModule } from '.././cliente/cliente.module';
import { PedidoProductoModule } from '.././pedido-producto/pedido-producto.module';

@Module({
  imports:[TypeOrmModule.forFeature([Pedido]),
ProductoModule, ClienteModule, PedidoProductoModule],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService, TypeOrmModule]
})
export class PedidoModule {}
