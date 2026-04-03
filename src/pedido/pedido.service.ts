import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { responseDTO } from 'src/producto/dto/responseDTO';
import { In, Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { PedidoProducto } from 'src/pedido-producto/entities/pedido-producto.entity';

@Injectable()
export class PedidoService {
  constructor(@InjectRepository(Pedido) private readonly pedidoRepository : Repository <Pedido>,
              @InjectRepository(Cliente) private readonly clienteRepository : Repository <Cliente>,
              @InjectRepository(Producto) private readonly productoRepository : Repository <Producto>,
              @InjectRepository(PedidoProducto) private readonly pedProRepository : Repository <PedidoProducto>){}

  async create(body: CreatePedidoDto) : Promise <Pedido> {
    try {
      
      const {clienteId, productos} = body;
      //valido el cliente
      const cliente = await this.clienteRepository.findOne({
            where: {id_cliente : clienteId}
      })
        if(!cliente)  throw new NotFoundException('No se encontro el cliente');

        if(!productos || productos.length === 0)  throw new BadRequestException('Se debe agregar productos')

          const productosDB = await this.productoRepository.findBy({
            id_producto : In(productos.map(p => p.productoId))
          });

        if (productosDB.length !== productos.length) throw new NotFoundException('Uno o más productos no existen');

          //crear pedidoProductos
          let total = 0;
          const pedidoProductos: PedidoProducto[] = productos.map(p => {
          const producto = productosDB.find(
          prod => prod.id_producto === p.productoId);
        
        if (!producto) throw new NotFoundException(`Producto ${p.productoId} no encontrado`);

        if (producto.stock < p.cantidad) throw new BadRequestException(`Stock insuficiente para ${producto.nombre}`);
    
          const subtotal = Number(producto.precio) * p.cantidad;
          total += subtotal;

            return this.pedProRepository.create({
            producto,
            cantidad: p.cantidad,
            precioUnitario: producto.precio
          });
       });

          const pedido =  this.pedidoRepository.create({
            cliente, productos : pedidoProductos, total
            })
            // Descontar stock
            for (const p of productos) { 
                await this.productoRepository.decrement(
                    { id_producto: p.productoId },
                        'stock',
                      p.cantidad
        );
      }
          return await this.pedidoRepository.save(pedido); 

    } catch (error) {
        throw new InternalServerErrorException('Error al crear pedido'); 
    }
  }

  async findAll() : Promise <responseDTO> {
    const pedidos = await this.pedidoRepository.find()
    if(!pedidos) throw new NotFoundException('No se encontraron pedidos');
    return {
        message : 'Todos los pedidos',
        code : HttpStatus.OK,
        data : pedidos
    };
  }

  async findOne(id: number) : Promise <responseDTO> {
    const resp = await this.pedidoRepository.findOneBy({id_pedido : id});
    if(!resp) throw new NotFoundException ('No se encontro pedido')
    return{
        message : 'Pedido encontrado',
        code : HttpStatus.OK,
        data : resp 
    } ;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto) : Promise <responseDTO> {
    const updatePedido = await this.pedidoRepository.update({id_pedido : id}, updatePedidoDto);
    if(!updatePedido.affected) throw new NotFoundException('Error al modificar el pedido');
    return {
          message : 'Pedido modificado',
          code : HttpStatus.NO_CONTENT
    };
  }

  async remove(id: number) : Promise <responseDTO> {
    const deletePedido = await this.pedidoRepository.delete({id_pedido : id});
    if(!deletePedido.affected) throw new NotFoundException('Error al eliminar pedido')
    return {
          message : 'Pedido eliminado',
          code : HttpStatus.NO_CONTENT
    };
  }
}
