import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { responseDTO } from 'src/producto/dto/responseDTO';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';

@Injectable()
export class PedidoService {
  constructor(@InjectRepository(Pedido) private readonly pedidoRepository : Repository <Pedido>){}

  async create(createPedido: CreatePedidoDto) : Promise <responseDTO> {
    const newPedido = this.pedidoRepository.create(createPedido);
    const resp = await this.pedidoRepository.save(newPedido);
    if(!resp) throw new NotFoundException ('Pedido no creado')
    return {
          message : 'Pedido creado',
          code : HttpStatus.CREATED,
          data : resp
    };
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
