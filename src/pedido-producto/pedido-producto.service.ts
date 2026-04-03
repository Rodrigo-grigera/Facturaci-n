import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PedidoProductoDto } from './dto/create-pedido-producto.dto';
import { UpdatePedidoProductoDto } from './dto/update-pedido-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { responseDTO } from 'src/producto/dto/responseDTO';
import { Repository } from 'typeorm';
import { PedidoProducto } from './entities/pedido-producto.entity';

@Injectable()
export class PedidoProductoService {
   constructor(@InjectRepository(PedidoProducto) private readonly pedProdRepository : Repository <PedidoProducto>){}
  
    async findAll() : Promise <responseDTO>{
        const pedProd = await this.pedProdRepository.find();
      if(!pedProd) throw new NotFoundException('No se puedo  realizar la operacion')
  
            return{
                  message: 'Todos los pedido - producto',
                  code : HttpStatus.OK,
                  data : pedProd
          } ;
    }
  
    async findOne(id: number) : Promise <responseDTO> {
      const pedProdOne = await this.pedProdRepository.findOneBy({id_pediProd : id});
      if(!pedProdOne) throw new NotFoundException('NO se encontro')
            return{
                  message: 'Pedido - Producto',
                  code : HttpStatus.OK,
                  data : pedProdOne
          } ;
    }
  
    async update(id: number, updatePedPro: UpdatePedidoProductoDto) : Promise <responseDTO> {
      const updatePedProd = await this.pedProdRepository.update( id , updatePedPro);
      if(!updatePedProd.affected) throw new NotFoundException('No se pudo actualizar')
            return{
                  message: 'Modificado con Exito',
                  code : HttpStatus.NO_CONTENT
                  
          } ;
    }
  
    async remove(id: number) : Promise <responseDTO> {
      const deletePedProd = await this.pedProdRepository.delete(id);
          if(!deletePedProd.affected) throw new NotFoundException('No se pudo eliminar')
            return{
                  message: 'Se elimino correctamente',
                  code : HttpStatus.NO_CONTENT
          } ;
    }
}
