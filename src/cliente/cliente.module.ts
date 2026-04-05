import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { LocalidadModule } from '.././localidad/localidad.module';

@Module({
  imports:[TypeOrmModule.forFeature([Cliente]),
LocalidadModule],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService, TypeOrmModule]
})
export class ClienteModule {}
