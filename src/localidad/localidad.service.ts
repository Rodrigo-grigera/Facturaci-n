import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { Localidad } from './entities/localidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { responseDTO } from 'src/producto/dto/responseDTO';
import { UpdateClienteDto } from 'src/cliente/dto/update-cliente.dto';

@Injectable()
export class LocalidadService {

  constructor(@InjectRepository(Localidad) private readonly localRepository : Repository <Localidad>){}

  async create(createLocalida: CreateLocalidadDto) : Promise <Localidad> {
      const createLocalidad = this.localRepository.create(createLocalida);
        const nuevaLocalidad = await this.localRepository.save(createLocalidad);
        return nuevaLocalidad;
  }

  async findAll() : Promise <responseDTO>{
      const localidades = await this.localRepository.find();
    if(!localidades) throw new NotFoundException('No se encontraron localidades')

          return{
                message: 'Todos los clientes',
                code : HttpStatus.OK,
                data : localidades
        } ;
  }

  async findOne(id: number) : Promise <responseDTO> {
    const localidad = await this.localRepository.findOneBy({id_localidad : id});
    if(!localidad) throw new NotFoundException('NO se encontro localidad')
          return{
                message: 'Todas las localidades',
                code : HttpStatus.OK,
                data : localidad
        } ;
  }

  async update(id: number, updateLocalidad: UpdateLocalidadDto) : Promise <responseDTO> {
    const updateLoca = await this.localRepository.update({id_localidad : id} , updateLocalidad);
    if(!updateLoca.affected) throw new NotFoundException('No se pudo actualizar La localidad')
          return{
                message: 'Localidad modificada',
                code : HttpStatus.NO_CONTENT
                
        } ;
  }

  async remove(id: number) : Promise <responseDTO> {
    const deleteLoca = await this.localRepository.delete({id_localidad: id});
        if(!deleteLoca.affected) throw new NotFoundException('No se pudo eliminar la localidad')
          return{
                message: 'Localidad eliminada',
                code : HttpStatus.NO_CONTENT
        } ;
  }
}
