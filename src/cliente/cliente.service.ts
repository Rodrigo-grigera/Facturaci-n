import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { responseDTO } from 'src/producto/dto/responseDTO';

@Injectable()
export class ClienteService {

  constructor(@InjectRepository(Cliente) private readonly clienterepository : Repository <Cliente>){}

  async create(createCliente: CreateClienteDto) : Promise <responseDTO> {
      const createClien = this.clienterepository.create(createCliente);
        const nuevoClie = await this.clienterepository.save(createClien);
        return{
              message: 'Cliente agregado',
              code : HttpStatus.CREATED,
              data : nuevoClie
        } ;
  }

  async findAll() : Promise <responseDTO>{
      const clientes = await this.clienterepository.find();
    if(!clientes) throw new NotFoundException('No se encontraron los clientes')

          return{
                message: 'Todos los clientes',
                code : HttpStatus.OK,
                data : clientes
        } ;
  }

  async findOne(id: number) : Promise <responseDTO> {
    const cliente = await this.clienterepository.findOneBy({id_cliente : id});
    if(!cliente) throw new NotFoundException('Cliente NO encontrado')
          return{
                message: 'Todos los clientes',
                code : HttpStatus.OK,
                data : cliente
        } ;
  }

  async update(id: number, updateCliente: UpdateClienteDto) : Promise <responseDTO> {
    const updateClien = await this.clienterepository.update({id_cliente : id} , updateCliente);
    if(!updateClien.affected) throw new NotFoundException('No se pudo actualizar el cliente')
          return{
                message: 'Cliente modificado',
                code : HttpStatus.NO_CONTENT
                
        } ;
  }

  async remove(id: number) : Promise <responseDTO> {
    const deleteClie = await this.clienterepository.delete({id_cliente : id});
        if(!deleteClie.affected) throw new NotFoundException('No se pudo eliminar el cliente')
          return{
                message: 'Cliente eliminado',
                code : HttpStatus.NO_CONTENT
        } ;
  }
}
