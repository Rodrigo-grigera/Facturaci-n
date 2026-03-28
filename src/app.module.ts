import { Module } from '@nestjs/common';
import { ProductoModule } from './producto/producto.module';
import {ConfigModule} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/entities/producto.entity';
import { ClienteModule } from './cliente/cliente.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { LocalidadModule } from './localidad/localidad.module';
import { PedidoModule } from './pedido/pedido.module';
import { PedidoProductoModule } from './pedido-producto/pedido-producto.module';
import { Localidad } from './localidad/entities/localidad.entity';
import { Pedido } from './pedido/entities/pedido.entity';
import { PedidoProducto } from './pedido-producto/entities/pedido-producto.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      synchronize: true,
      entities:[Producto,Cliente,Localidad,Pedido,PedidoProducto]
    })
    , ProductoModule, ClienteModule, LocalidadModule, PedidoModule, PedidoProductoModule],
  
})
export class AppModule {}
