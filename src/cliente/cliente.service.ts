import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { responseDTO } from '../responseDTO';
import { Localidad } from '.././localidad/entities/localidad.entity';


@Injectable()
export class ClienteService {

  constructor(@InjectRepository(Cliente) private readonly clienteRepository : Repository <Cliente>,
              @InjectRepository(Localidad) private readonly localRepository : Repository <Localidad>){}

  async create(body: CreateClienteDto) : Promise <Cliente> {
      try {
            const{localidadId, ...clienteData} = body;
            //localidadId es el nombre de la variable que en dto no existe como id
            let localidad : Localidad | null = null;

            if(localidadId !== undefined && localidadId !== null){
                  localidad = await this.localRepository.findOne({
                  where: {id_localidad: localidadId}
                  })
                  if(!localidad){
                        throw new NotFoundException('Localidad no encontrada');
                  }
                  
            }     
                  const crearClien = this.clienteRepository.create({
                        ...clienteData, 
                        ...(localidad ? {localidad} : {} ) }); //Si localidad viene guarda la localidad si no viene guarda null
                  const nuevoClie = await this.clienteRepository.save(crearClien);
                  return nuevoClie;

      } catch (error) {
            console.log(error)
            throw error;
      }
  }

  async findAll() : Promise <responseDTO<Cliente>>{
      const clientes = await this.clienteRepository.find({
            relations: ['localidad']
      });
    if(!clientes) throw new NotFoundException('No se encontraron los clientes')

          return{
                message: 'Todos los clientes',
                code : HttpStatus.OK,
                data : clientes
        } ;
  }
  async findPorLocalidad(id: number): Promise <responseDTO<Cliente>>{

      const localidad = await this.localRepository.findOne({
            where:{id_localidad : id},
      })
      if(!localidad) throw new NotFoundException('No existe localidad')
            
      const clientes = await this.clienteRepository.find({
            where: {
                  localidad: {id_localidad : id}
            },
            relations: ['localidad']
      })

      return {
            message: 'Todos los clientes con misma localidad',
            code: HttpStatus.OK,
            data: clientes

      }
  }

  async findOne(id: number) : Promise <responseDTO<Cliente>> {
    const cliente = await this.clienteRepository.findOne({
      where: {id_cliente : id},
      relations : ['localidad']
    })
    if(!cliente) throw new NotFoundException('Cliente NO encontrado')
          return{
                message: 'Cliente encontrado',
                code : HttpStatus.OK,
                data : cliente
        } ;
  }

  async update(id: number, updateCliente: UpdateClienteDto) : Promise <responseDTO<Cliente>> {
      const cliente = await this.clienteRepository.findOne({
            where : {id_cliente : id},
            relations : ['localidad']
      })

      if(!cliente) throw new NotFoundException('Cliente no encontrado')

            if(updateCliente.nombre) cliente.nombre = updateCliente.nombre
            if(updateCliente.apellido) cliente.apellido = updateCliente.apellido
            if(updateCliente.celular) cliente.celular = updateCliente.celular
            if(updateCliente.direccion) cliente.direccion = updateCliente.direccion
            if(updateCliente.localidadId){
                  const localidad = await this.localRepository.findOne({
                        where: {id_localidad : updateCliente.localidadId}
                  });

                  if(!localidad) throw new NotFoundException('Localidad no encontrada')
                  cliente.localidad = localidad;
            }
                 
            await this.clienteRepository.save(cliente);

          return{
                message: 'Cliente modificado',
                code : HttpStatus.OK
                
        } ;
  }

  async remove(id: number) : Promise <responseDTO<Cliente>> {
    const deleteClie = await this.clienteRepository.delete({id_cliente : id});
        if(!deleteClie.affected) throw new NotFoundException('No se pudo eliminar el cliente')
          return{
                message: 'Cliente eliminado',
                code : HttpStatus.NO_CONTENT
        } ;
  }
}
