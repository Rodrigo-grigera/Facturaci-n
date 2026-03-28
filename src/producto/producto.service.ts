import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { responseDTO } from './dto/responseDTO';

@Injectable()
export class ProductoService {

  constructor( @InjectRepository(Producto) private readonly productoRepository : Repository <Producto> ){}

  async create(producto: CreateProductoDto) : Promise <responseDTO> {
    const createPro = this.productoRepository.create(producto);
    const nuevoPro = await this.productoRepository.save(createPro);
    return{
          message: 'Producto agregado',
          code : HttpStatus.CREATED,
          data : nuevoPro
    } ;
  }

  async findAll(): Promise <responseDTO> {
    const resp = await this.productoRepository.find();
    if(!resp) throw new NotFoundException('No se encontraron los productos');
    return {
          message: 'Todos los Productos',
          code : HttpStatus.OK,
          data : resp
    };
  }

  async findOne(id: number) : Promise <responseDTO> {
    const resp = await this.productoRepository.findOneBy({id_producto : id});
    if(!resp) throw new NotFoundException('No se encontro producto');
    return {
          message : 'Producto encontrado',
          code : HttpStatus.OK,
          data : resp
    };
  }

  async update(id: number, updateProducto: UpdateProductoDto) : Promise <responseDTO> {
    const modificarPro = await this.productoRepository.update(id, updateProducto);
    if(!modificarPro.affected) throw new NotFoundException('Error al modificar el producto')
    return{
          message : 'Producto modificado',
          code : HttpStatus.NO_CONTENT
    };
  }

  async remove(id: number) : Promise <responseDTO>{
    const eliminar = await this.productoRepository.delete(id);
    if(!eliminar.affected) throw new NotFoundException('No se pudo eliminar el producto')
    return {
          message : 'Producto eliminado',
          code : HttpStatus.NO_CONTENT
    };
  }
}
