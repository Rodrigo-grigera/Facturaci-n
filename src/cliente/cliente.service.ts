import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { responseDTO } from 'src/producto/dto/responseDTO';
import { Localidad } from 'src/localidad/entities/localidad.entity';


@Injectable()
export class ClienteService {

  constructor(@InjectRepository(Cliente) private readonly clienteRepository : Repository <Cliente>,
              @InjectRepository(Localidad) private readonly localRepository : Repository <Localidad>){}

  async create(body: CreateClienteDto) : Promise <Cliente> {
      try {
            const{localidadId, ...clienteData} = body;
            //localidadId es el nombre de la variable que en dto no existe como id
            let localidad : Localidad | null = null;

            if(localidadId){
                  localidad = await this.localRepository.findOne({
                  where: {id_localidad: localidadId}
                  })
                  if(!localidad){
                        throw new NotFoundException('localidad no encontrada');
                  }
                  
            }
                  
                  const crearClien = this.clienteRepository.create({
                        ...clienteData, 
                        ...(localidad ? {localidad} : {} ) }); //Si localidad viene guarda la localidad si no viene guarda null
                  const nuevoClie = await this.clienteRepository.save(crearClien);
                  return nuevoClie;

      } catch (error) {
            throw new InternalServerErrorException('Error al crear cliente');
      }
  }

  async findAll() : Promise <responseDTO>{
      const clientes = await this.clienteRepository.find();
    if(!clientes) throw new NotFoundException('No se encontraron los clientes')

          return{
                message: 'Todos los clientes',
                code : HttpStatus.OK,
                data : clientes
        } ;
  }

  async findOne(id: number) : Promise <responseDTO> {
    const cliente = await this.clienteRepository.findOneBy({id_cliente : id});
    if(!cliente) throw new NotFoundException('Cliente NO encontrado')
          return{
                message: 'Todos los clientes',
                code : HttpStatus.OK,
                data : cliente
        } ;
  }

  async update(id: number, updateCliente: UpdateClienteDto) : Promise <responseDTO> {
    const updateClien = await this.clienteRepository.update({id_cliente : id} , updateCliente);
    if(!updateClien.affected) throw new NotFoundException('No se pudo actualizar el cliente')
          return{
                message: 'Cliente modificado',
                code : HttpStatus.NO_CONTENT
                
        } ;
  }

  async remove(id: number) : Promise <responseDTO> {
    const deleteClie = await this.clienteRepository.delete({id_cliente : id});
        if(!deleteClie.affected) throw new NotFoundException('No se pudo eliminar el cliente')
          return{
                message: 'Cliente eliminado',
                code : HttpStatus.NO_CONTENT
        } ;
  }
}
